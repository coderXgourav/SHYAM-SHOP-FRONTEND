import React, { useEffect, useState } from 'react';
import AdminFooter from "../../../components/admin/AdminFooter";
import AdminHeader from "../../../components/admin/AdminHeader";
import axios from 'axios';
import Cookies from "js-cookie";

const AdminViewSeller = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [sellersData, setSellersData] = useState({
    countSeller: 0,
    sellers: []
  });

  useEffect(() => {
    const token = Cookies.get("adminToken");

    axios.get(`${process.env.REACT_APP_API_URL}/admin/admin-get-all-seller`, {
      headers: {
        'Authorization': `${token}`,
      },
    })
    .then((response) => {
      setSellersData(response.data); // Set the entire response data
    })
    .catch((error) => {
      console.error('Error fetching sellers:', error);
    });
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="page-wrapper">
        <div className="page-content">
          <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div className="ps-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="javascript:void(0);">
                      <i className="bx bx-home-alt" />
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Manage Sellers
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="d-lg-flex align-items-center mb-4 gap-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control ps-5 radius-30"
                    placeholder="Search sellers"
                  />
                  <span className="position-absolute top-50 product-show translate-middle-y">
                    <i className="bx bx-search" />
                  </span>
                </div>
                <div className="ms-auto">
                  <a href="#" className="btn btn-sm btn-primary mt-2 mt-lg-0">
                    <i className="bx bxs-plus-square" />
                    Add New Seller
                  </a>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>No</th>
                      <th>Seller Name</th>
                      <th>Email</th>
                      <th>Date Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellersData.sellers.length > 0 ? (
                      sellersData.sellers.map((seller,index) => (
                        <tr key={seller._id}>
                            <td>{(currentPage - 1) * 10 + index + 1}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              {/* <div>
                                <input
                                  className="form-check-input me-3"
                                  type="checkbox"
                                  value=""
                                  aria-label="..."
                                />
                              </div> */}
                              <div className="ms-2">
                                <h6 className="mb-0 font-14">{seller._id}</h6>
                              </div>
                            </div>
                          </td>
                          <td>{seller.seller_name}</td>
                          <td>{seller.seller_email}</td>
                          <td>{new Date(seller.createdAt).toLocaleDateString()}</td>
                          <td>
                            <div className="d-flex order-actions">
                              <a href="javascript:void(0);" className="">
                                <i className="bx bxs-edit"></i>
                              </a>
                              <a href="javascript:void(0);" className="ms-3">
                                <i className="bx bxs-trash"></i>
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No sellers found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* <div className="mt-3"> */}
                  {/* <p>Total Sellers: {sellersData.countSeller}</p> Display total sellers */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminViewSeller;
