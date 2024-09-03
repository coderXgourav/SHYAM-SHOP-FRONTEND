import React, { useState } from 'react';
import axios from 'axios';
import AdminFooter from "../../../../components/admin/AdminFooter";
import AdminHeader from "../../../../components/admin/AdminHeader";
import Cookies from "js-cookie";
import { toast, ToastContainer, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AdminAddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [newSubCategory, setNewSubCategory] = useState('');

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    // Optional: Check file size on client-side
    const maxSize = 32 * 1024 * 1024; // 32MB
    if (file.size > maxSize) {
      toast.error('File size exceeds the 32MB limit. Please upload a smaller file.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    
    setImage(file);

    // Create a URL for the selected image file and update the preview state
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubCategoryChange = (e) => {
    setNewSubCategory(e.target.value);
  };

  const addSubCategory = () => {
    if (newSubCategory.trim()) {
      setSubCategories([...subCategories, { sub: newSubCategory }]);
      setNewSubCategory('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('image', image);

    if (subCategories.length > 0) {
      formData.append('sub_category', JSON.stringify(subCategories)); // Convert sub_category array to JSON string
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/admin-create-category`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${Cookies.get('adminToken')}`,
          },
        }
      );

      toast.success('Category added successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      // Reset form fields
      setCategoryName('');
      setImage(null);
      setImagePreview('');
      setSubCategories([]);
      
      console.log('Category created successfully', response.data);
    } catch (error) {
      toast.error('Failed to create category. Please try again.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.error('Failed to create category', error.response?.data || error.message);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="page-wrapper">
        <div className="page-content">
          <div className="row">
            <div className="col-xl-9 mx-auto">
              <form id="formSubmit" onSubmit={handleSubmit}>
                <div className="card">
                  <div className="card-header">
                    <h4 className="my-4 text-center text-primary">
                      Add Category
                    </h4>
                  </div>
                  <div className="card-body">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Type Category Name"
                      required
                      value={categoryName}
                      onChange={handleCategoryNameChange}
                    />
                    <br />
                    <input
                        className="form-control"
                        type="file"
                        required
                        onChange={handleImageChange}
                      />
                      <br />
                      {imagePreview && (
                        <div className="text-center my-3">
                          <img
                            src={imagePreview}
                            alt="Image preview"
                            style={{ maxWidth: '50%', height: 'auto' }}
                          />
                        </div>
                      )}

                    <div className="mb-3" style={{display:"flex",alignItems:"center",gap:"1rem",height:"5vh"}}>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Type Sub-category Name"
                        value={newSubCategory}
                        onChange={handleSubCategoryChange}
                      />
                      <button
                        type="button"
                        className="btn btn-secondary  my-3"
                        onClick={addSubCategory} style={{display:"flex",alignItems:"center",justifyContent:"center",height:"5vh",fontSize:"20px"}}
                      >
                        +
                      </button>
                    </div>
                    {subCategories.length > 0 && (
                      <ul className="list-group">
                        {subCategories.map((subCategory, index) => (
                          <li key={index} className="list-group-item">
                            {subCategory.sub}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="card-footer text-center">
                    <input
                      type="submit"
                      className="btn btn-primary my-3"
                      value="Add Category"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
      <ToastContainer />
    </>
  );
};

export default AdminAddCategory;
