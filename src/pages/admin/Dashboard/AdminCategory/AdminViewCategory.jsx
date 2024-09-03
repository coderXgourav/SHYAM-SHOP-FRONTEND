import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminFooter from "../../../../components/admin/AdminFooter";
import AdminHeader from "../../../../components/admin/AdminHeader";
import Cookies from "js-cookie";

const AdminViewCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/admin-category`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("adminToken")}`, // Include token if needed
            },
          }
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const confirmFunction = async (categoryId, deleteUrl) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}${deleteUrl}/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("adminToken")}`, // Include token if needed
            },
          }
        );
        // Update the category list after deletion
        setCategories(
          categories.filter((category) => category._id !== categoryId)
        );
      } catch (error) {
        console.error("Failed to delete category", error);
      }
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="page-wrapper">
        <div className="page-content">
          {/* breadcrumb */}
          <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div className="ps-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="javascript:;">
                      <i className="bx bx-home-alt" />
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Categories
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          {/* end breadcrumb */}
          <div className="card">
            <div className="card-body">
              <div className="d-lg-flex align-items-center mb-4 gap-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control ps-5 radius-30"
                    placeholder="Search category"
                  />
                  <span className="position-absolute top-50 product-show translate-middle-y">
                    <i className="bx bx-search" />
                  </span>
                </div>

                <div className="ms-auto">
                  <a href="#" className="btn btn-sm btn-primary mt-2 mt-lg-0">
                    <i className="bx bxs-plus-square" />
                    Add New Category
                  </a>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table mb-0" id="myTable">
                  <thead className="table-light">
                    <tr>
                      <th>No</th>
                      <th>Image</th>
                      <th>Category Name</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category, index) => (
                      <tr key={category._id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={`${process.env.REACT_APP_API_URL}/${category.image}`}
                            alt={category.name}
                            className="img img-thumbnail"
                            width="50px"
                          />
                        </td>
                        <td>{category.name}</td>
                        <td>
                          {new Date(category.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="d-flex order-actions">
                            <a
                              href={`edit-category/${category._id}`}
                              className=""
                            >
                              <i className="bx bxs-edit" />
                            </a>
                            <a
                              href="javascript:;"
                              className="ms-3"
                              onClick={() =>
                                confirmFunction(
                                  category._id,
                                  "/admin/delete-category"
                                )
                              }
                            >
                              <i className="bx bxs-trash" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminViewCategory;
