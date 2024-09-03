import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Pagination, Spin } from 'antd';
import AdminFooter from "../../../../components/admin/AdminFooter";
import AdminHeader from "../../../../components/admin/AdminHeader";
import Cookies from "js-cookie";

const AdminViewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // Added loading state

  const fetchCategories = async (page = 1) => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/admin-category`, {
        headers: {
          'Authorization': `${Cookies.get('adminToken')}`,
        },
        params: {
          page,
          limit: 10, // Fetch 10 categories per page
        },
      });
      setCategories(response.data.categories);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    } finally {
      setLoading(false); // Set loading to false when fetching completes
    }
  };

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  const confirmFunction = (categoryId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this category?',
      content: 'This action cannot be undone.',
      onOk: async () => {
        try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/admin/admin-delete-category/${categoryId}`, {
            headers: {
              'Authorization': `${Cookies.get('adminToken')}`,
            },
          });
          // Fetch updated categories after deletion
          fetchCategories(currentPage);
        } catch (error) {
          console.error('Failed to delete category', error);
        }
      },
      onCancel() {
        console.log('Deletion cancelled');
      },
    });
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
                  <a
                    href="/admin-request-category"
                    className="btn btn-sm btn-primary mt-2 mt-lg-0"
                  >
                    <i className="bx bxs-plus-square" />
                    Add New Category
                  </a>
                </div>
              </div>
              <div className="table-responsive" style={{ overflowY: "hidden" }}>
                {/* Display spinner while loading */}
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                    <Spin size="large" />
                  </div>
                ) : (
                  <>
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
                            <td>{(currentPage - 1) * 10 + index + 1}</td>
                            <td>
                              <img
                                src={category.image ? `${process.env.REACT_APP_API_URL}/uploads/${category.image.split('\\').pop()}` : 'default-image-path'}
                                alt={category.name}
                                className="img img-thumbnail"
                                width="70px"
                                

                              />
                            </td>
                            <td>{category.name}</td>
                            <td>{new Date(category.createdAt).toLocaleDateString()}</td>
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
                                  onClick={() => confirmFunction(category._id)}
                                >
                                  <i className="bx bxs-trash" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* Pagination Controls */}
                    <div className="pagination mt-4">
                      <Pagination
                        current={currentPage}
                        total={totalPages * 10} // Total number of items
                        pageSize={10} // Number of items per page
                        onChange={page => setCurrentPage(page)}
                        showSizeChanger={false} // Hide size changer
                      />
                    </div>
                  </>
                )}
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
