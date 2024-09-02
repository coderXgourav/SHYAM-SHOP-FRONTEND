import React, { useState } from 'react';
import axios from 'axios';
import AdminFooter from "../../../../components/admin/AdminFooter";
import AdminHeader from "../../../../components/admin/AdminHeader";
import Cookies from "js-cookie";

const AdminAddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [data,setData]=useState([])


  console.log('image',image)

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('image', image);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/admin-create-category`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${Cookies.get('adminToken')}`, // Include token if needed
          },
        }
      );

      console.log(response.data);
      setData(response.data)
      alert('Category added successfully!');
      // Optionally, you can redirect or reset the form here
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category.');
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="page-wrapper">
        <div className="page-content">
          {/*breadcrumb*/}
          <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div className="breadcrumb-title pe-3">Forms</div>
            <div className="ps-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="javascript:;">
                      <i className="bx bx-home-alt" />
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Add Category
                  </li>
                </ol>
              </nav>
            </div>
            <div className="ms-auto">
              <div className="btn-group">
                <a href="{{route('seller.viewCategoryPage')}}">
                  <button type="button" className="btn btn-sm btn-primary">
                    View Category
                  </button>
                </a>
              </div>
            </div>
          </div>
          {/*end breadcrumb*/}
          <div className="row">
            <div className="col-xl-9 mx-auto">
              <form id="formSubmit" onSubmit={handleSubmit}>
                <div className="card">
                  <div className="card-header">
                    <h4 className="my-4 text-center text-primary">
                      Add Category{" "}
                    </h4>
                  </div>
                  <div className="card-body">
                    <br />
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
                      <div className="text-center">
                        <img
                          src={imagePreview}
                          alt="Image preview"
                          style={{ maxWidth: '100%', height: 'auto' }}
                        />
                      </div>
                    )}
                  </div>
                  <br />
                  <div className="card-footer text-center">
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Add Category"
                    />
                  </div>
                  <br />
                </div>
              </form>
            </div>
          </div>
          {/*end row*/}
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminAddCategory;
