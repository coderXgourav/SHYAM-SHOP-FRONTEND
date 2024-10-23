
import React, { useEffect, useState } from 'react';
import { message, Popconfirm, Select } from 'antd';
import AdminFooter from "../../../components/admin/AdminFooter";
import AdminHeader from "../../../components/admin/AdminHeader";
import axios from 'axios';
import Cookies from "js-cookie";

const { Option } = Select;

const AdminViewSeller = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sellersData, setSellersData] = useState({
    countSeller: 0,
    sellers: []
  });
  const [approvalStatus, setApprovalStatus] = useState({});

  const token = Cookies.get("adminToken");

  useEffect(() => {
    const token = Cookies.get("adminToken");

    axios.get(`${process.env.REACT_APP_API_URL}/admin/admin-get-all-seller`, {
      headers: {
        'Authorization': `${token}`,
      },
    })
    .then((response) => {
      setSellersData(response.data);
    })
    .catch((error) => {
      console.error('Error fetching sellers:', error);
    });
  }, []);



  // Function to handle seller deletion
  const deleteSeller = async (sellerId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/admin/admin-delete-seller/${sellerId}`,{
        headers: {
          'Authorization': `${token}`,
        },
      });
      
      if (response.data.status) {
        // Show success message
        message.success(response.data.message);
  
        // Update the sellers array in the state after successful deletion
        setSellersData((prevData) => ({
          ...prevData,
          sellers: prevData.sellers.filter((seller) => seller._id !== sellerId),
          countSeller: prevData.countSeller - 1 // Decrement the seller count
        }));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting seller:", error);
      message.error('Failed to delete seller');
    }
  };
  


  const handleApprovalChange = async (sellerId, value) => {
    const token = Cookies.get("adminToken");

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/approve-seller/${sellerId}`, {
        status: value
      }, {
        headers: {
          'Authorization': `${token}`,
        },
      });

      // Optionally, refetch sellers after approval
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/admin-get-all-seller`, {
        headers: {
          'Authorization': `${token}`,
        },
      });
      setSellersData(response.data);
    } catch (error) {
      console.error('Error approving seller:', error);
    }
  };

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
                  <a href="/admin-add-seller" className="btn btn-sm btn-primary mt-2 mt-lg-0">
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
                      <th>Seller Id</th>
                      <th>Date Joined</th>
                      <th>Seller Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellersData.sellers.length > 0 ? (
                      sellersData.sellers.map((seller, index) => (
                        <tr key={seller._id}>
                          <td>{(currentPage - 1) * 10 + index + 1}</td>
                          <td>
                            <h6 className="mb-0 font-14">{seller._id}</h6>
                          </td>
                          <td>{new Date(seller.createdAt).toLocaleDateString()}</td>
                          <td>{seller.seller_name}</td>
                          <td>{seller.seller_email}</td>
                          <td>
                            <div className="d-flex order-actions">
                            <Select
                                value={seller.isApproved ? "Approved" : "Pending"}
                                style={{ width: 120 }}
                                onChange={(value) => handleApprovalChange(seller._id, value)}
                                disabled={seller.isApproved} // Disable if already approved
                              >
                                {seller.isApproved ? (
                                  <Option value="Approved">Approved</Option>
                                ) : (
                                  <>
                                    <Option value="Pending">Pending</Option>
                                    <Option value="Approved">Approve</Option>
                                  </>
                                )}
                              </Select>

                              {/* <a href="javascript:void(0);" className="">
                                <i className="bx bxs-edit"></i>
                              </a> */}
                               <Popconfirm
                                title="Are you sure you want to delete this seller?"
                                onConfirm={() => deleteSeller(seller._id)}
                                okText="Yes"
                                cancelText="No"
                              >
                                  <a href="javascript:void(0);" className="ms-3">
                                <i className="bx bxs-trash"></i>
                              </a> 
                              </Popconfirm>
                               
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No sellers found
                        </td>
                      </tr>
                    )}
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

export default AdminViewSeller;
