import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminFooter from "../../../../components/admin/AdminFooter";
import AdminHeader from "../../../../components/admin/AdminHeader";
import Cookies from "js-cookie";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import { Button, Modal } from "antd";

const EditCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [newSubCategory, setNewSubCategory] = useState("");
  const [data, setData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const [subCategoryUpdateName, setSubCategoryUpdateName] = useState("");
  const [subCategoryUpdateId, setSubCategoryUpdateId] = useState(null);

  const [dataLoading, setDataLoading] = useState(true);
  const { id } = useParams();

  const token = Cookies.get("adminToken");

  const showLoading = async (subcategoryId) => {
    setOpen(true);
    setLoading(true);
    const getName = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/get-subcategory/${subcategoryId}`,
      {
        headers: {
          Authorization: Cookies.get("adminToken"),
        },
      }
    );

    setSubCategoryUpdateName(getName.data.sub);
    setSubCategoryUpdateId(getName.data._id);
    setLoading(false);

    return;
  };

  useEffect(async () => {
    const result = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/get-category-edit/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: Cookies.get("adminToken"),
        },
      }
    );
    const returnData = await result.json();
    if (returnData.status === false) {
      window.location = "/admin-view-category";
    }
    setData(returnData.sub_category);
    setDataLoading(false);
    setCategoryName(returnData.name);
    setImage(`${process.env.REACT_APP_API_URL}/uploads/${returnData.image}`);

    // console.log(returnData.sub_category);

    return;
  }, [0]);

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Optional: Check file size on client-side
    const maxSize = 32 * 1024 * 1024; // 32MB
    if (file.size > maxSize) {
      toast.error(
        "File size exceeds the 32MB limit. Please upload a smaller file.",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
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
      setNewSubCategory("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", image);

    if (subCategories.length > 0) {
      formData.append("sub_category", JSON.stringify(subCategories)); // Convert sub_category array to JSON string
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/admin-create-category`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("adminToken")}`,
          },
        }
      );

      toast.success("Category added successfully!", {
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

      console.log("Category created successfully", response.data);
    } catch (error) {
      toast.error("Failed to create category. Please try again.", {
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
      console.error(
        "Failed to create category",
        error.response?.data || error.message
      );
    }
  };

  const updateSubCategory = async (id) => {
    try {
      const update = await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/update-subcategory/${id}`,
        { updateName: subCategoryUpdateName },
        {
          headers: {
            authorization: token,
          },
        }
      );
      const result = update.data;
      toast[result.icon](result.title);
      setOpen(false);
    } catch (error) {
      toast["error"](error.message);
      setOpen(false);
    }
  };
  return (
    <>
      <AdminHeader />
      {dataLoading ? (
        <Spin
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        />
      ) : (
        <div className="page-wrapper">
          <div className="page-content">
            <div className="row">
              <div className="col-xl-9 mx-auto">
                <form id="formSubmit" onSubmit={handleSubmit}>
                  <div className="card">
                    <div className="card-header">
                      <h4 className="my-4 text-center text-primary">
                        Edit Category
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

                      {(imagePreview && (
                        <div className="text-center my-3">
                          <img
                            src={imagePreview}
                            alt="Image preview"
                            style={{ maxWidth: "50%", height: "auto" }}
                          />
                        </div>
                      )) || (
                        <div>
                          <img src={image} alt="previous image" />
                        </div>
                      )}

                      <div
                        className="mb-3"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          height: "5vh",
                        }}
                      >
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
                          onClick={addSubCategory}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "5vh",
                            fontSize: "20px",
                          }}
                        >
                          +
                        </button>
                      </div>
                      {subCategories.length > 0 && (
                        <ul className="list-group">
                          {subCategories.map((subCategory, index) => (
                            <div>
                              <div>
                                <li key={index} className="list-group-item">
                                  <input
                                    className="form-control"
                                    type="text"
                                    name={subCategory._id}
                                    value={subCategory.sub}
                                    disabled={true}
                                  />
                                </li>
                              </div>
                            </div>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div>
                      {data.length > 0 && (
                        <ul className="list-group">
                          {data.map((subCategory, index) => (
                            <div>
                              <div>
                                <li
                                  key={index}
                                  className="list-group-item"
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                  }}
                                >
                                  <div style={{ width: "85%" }}>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name={subCategory._id}
                                      value={subCategory.sub}
                                      disabled={true}
                                    />
                                  </div>

                                  <div>
                                    <Button
                                      type="primary"
                                      onClick={() => {
                                        showLoading(subCategory._id);
                                      }}
                                    >
                                      <a className="">
                                        <i
                                          className="bx bxs-edit"
                                          style={{ fontSize: "15px" }}
                                        />
                                      </a>
                                    </Button>

                                    <a href="javascript:;" className="ms-3 ">
                                      <i
                                        className="bx bxs-trash"
                                        style={{
                                          fontSize: "20px",
                                          color: "red",
                                        }}
                                      />
                                    </a>
                                  </div>
                                </li>
                              </div>
                            </div>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="card-footer text-center">
                      <input
                        type="submit"
                        className="btn btn-primary my-3"
                        value="Update Category"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <Modal
            title={<p>Update Sub Category Name</p>}
            loading={loading}
            open={open}
            onCancel={() => setOpen(false)}
            onOk={() => {
              updateSubCategory(subCategoryUpdateId);
            }}
          >
            <input
              type="text"
              className="form-control my-4"
              placeholder="Type Updated name"
              value={subCategoryUpdateId != null ? subCategoryUpdateName : ""}
              onChange={(e) => {
                setSubCategoryUpdateName(e.target.value);
              }}
            />
          </Modal>
        </div>
      )}
      <AdminFooter />
      <ToastContainer />
    </>
  );
};

export default EditCategory;
