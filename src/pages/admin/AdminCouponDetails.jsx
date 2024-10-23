import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { message, Popconfirm } from "antd";
import AdminHeader from '../../components/admin/AdminHeader';
import SellerFooter from '../../components/seller/SellerFooter';
import Cookies from "js-cookie";

const AdminCouponDetails = () => {
  const { couponcode } = useParams(); 
  const [users, setUsers] = useState([]);
  const[totalData,setTotalData]=useState()
  const [formData, setFormData] = useState({
    code: '',
    discountValue: 0,
    expirationDate: '',
    
  });

  console.log('totaldata',totalData)

  const getSingleCoupon = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/coupons/get-single-coupons/${couponcode}`, {
        headers: { Authorization: Cookies.get("adminToken") },
      });
      const coupon = res.data.coupon;
      setFormData({
        code: coupon.code,
        discountValue: coupon.discountValue,
        expirationDate: coupon.expirationDate.split('T')[0],
        time_usage: coupon.time_usage,
        minimumPurchase: coupon.minimumPurchase,
        maximumDiscountAmount: coupon.maxDiscountAmount,
      });

      setUsers(res.data.coupon.cartItems.map(item => item));
      setTotalData(res.data.coupon.userUsage)
    } catch (error) {
      message.error('Error fetching coupon data.');
    }
  };



  useEffect(() => {
    getSingleCoupon();
    // getUsersWhoUsedCoupon();
  }, [couponcode]);

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
                    Coupon Details
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          {/* Coupon Details Section */}
          <div className="order-details my-4">
            <h5 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Coupon Details</h5>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <tbody className="bg-white divide-y divide-gray-200 text-gray-800">
                  <tr>
                    <td className="py-2 px-4 font-medium text-left">Coupon Code</td>
                    <td className="py-2 px-4 text-right">{formData.code}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-medium text-left">Discount Value</td>
                    <td className="py-2 px-4 text-right">{formData.discountValue}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-medium text-left">Expiration Date</td>
                    <td className="py-2 px-4 text-right">{formData.expirationDate}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-medium text-left">Limit</td>
                    <td className="py-2 px-4 text-right">{formData.time_usage}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-medium text-left">Maximum Discount Amount</td>
                    <td className="py-2 px-4 text-right">{formData.maximumDiscountAmount}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-medium text-left">Minimum Purchase</td>
                    <td className="py-2 px-4 text-right">{formData.minimumPurchase}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Users Who Used the Coupon Section */}
          <div className="users-who-used-coupon my-4">
            <h5 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Users Who Used This Coupon</h5>
            <div className="overflow-x-auto">
              <table className="table mb-0">
                <thead className="table-light">
                  <tr>
                    <th>User ID</th>
                    <th>User Name</th>
                    <th>Email</th>
                    {/* <th>Product Title</th> */}
                    <th>Total Amount</th>



                    {/* <th>Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {totalData?.length > 0 ? (
                    totalData?.map(user => (
                      <tr key={user._id}>
                        <td className="py-2 px-4">{user.userId}</td>
                        <td className="py-2 px-4">{user?.username}</td>
                        <td className="py-2 px-4">{user?.email}</td>
                        <td className="py-2 px-4">{user?.totalCartAmount}</td>
                        {/* <td className="py-2 px-4">
                          {users.product_id ? users.product_id.product_title : 'N/A'}
                        </td> */}
                       
{/*   
                        <td>
                          <div className="d-flex order-actions">
                            <Popconfirm
                              title="Are you sure you want to delete this user?"
                              onConfirm={() => handleDeleteUser(user._id)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <a href="javascript:void(0);" className="ms-3">
                                <i className="bx bxs-trash"></i>
                              </a>
                            </Popconfirm>
                          </div>
                        </td> */}

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
      <SellerFooter />
    </>
  );
};

export default AdminCouponDetails;
