import React, { useEffect, useState } from 'react'
import AdminHeader from '../../../components/admin/AdminHeader'
import AdminFooter from '../../../components/admin/AdminFooter'
import { Pagination, Select, Spin } from 'antd'
import axios from 'axios'
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const AdminManageOrder = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [filteredPayment, setFilteredPayment] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [currentPage, setCurrentPage] =useState(1);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [paymentFilter, setPaymentFilter] = useState('');
    const [orderFilter, setOrderFilter] =useState('');
   
    const [pageSize, setPageSize] = React.useState(10);
    const [updateOrder,setUpdateOrder]=useState([])

    const navigate=useNavigate()

    const token = Cookies.get("adminToken");
    const decodedToken = token && jwtDecode(token);


    const formatOrderDate = (date) => {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');  // Format the date
    };
  
    const paymentStatusOptions = [
      { value: '', label: 'Clear Filter' }, // Clear filter option
      { value: 'pending', label: 'Pending' },
      { value: 'succeeded', label: 'Succeeded' },
      { value: 'failed', label: 'Failed' }
    ];
  
    // Order status options
    const orderStatusOptions = [
      { value: '', label: 'Clear Filter' },
      { value: 'Pending', label: 'Pending' },
      { value: 'Processing', label: 'Processing' },
      { value: 'Shipped', label: 'Shipped' },
      { value: 'Out for delivery', label: 'Out for delivery' },
      { value: 'Delivered', label: 'Delivered' },
      { value: 'Cancelled', label: 'Cancelled' },
    ];
  

    const handleSearch = () => {
        setCurrentPage(1); // Reset to first page
        getOrder(1); // Fetch orders for first page with new filters
      };
    
      const handleOrderFilterChange = (value) => {
        setOrderFilter(value);
        setCurrentPage(1);
      };
    
      const handlePaymentFilterChange = (value) => {
        setPaymentFilter(value);
        setCurrentPage(1);
      };

      
    const handlePageChange = (page) => {
        setCurrentPage(page);
        
      };

    
  const getOrder = async (page) => {
    setLoading(true); // Set loading to true when fetching starts

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/get-order?&page=${page}&limit=${pageSize}&payment_status=${paymentFilter}&order_status=${orderFilter}&keyword=${keyword}`,
        {
          headers: {
            Authorization: `${token}`,
          }
        }
      );
     
      setAllOrders(res.data.orders);
      setFilteredPayment(res.data.orders);
      setTotalOrders(res.data.total_count);
      setCurrentPage(res.data.currentPage);
      // setFilteredPayment(res.data.orders); // Show all orders if no filter is applied
   
       // Only set filtered orders if the filter is applied
    // if (orderFilter || paymentFilter) {
    //   setFilteredPayment(res.data.orders);
     
    // } else {
    //   setFilteredPayment(res.data.orders); // No filter applied, show all orders
    // }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false); // Set loading to false when fetching completes
    }
  };
  const updateOrderStatus = async (orderId, productId, newStatus) => {
    setLoading(true); // Set loading to true when fetching starts
    const payload = {
      newStatus,
      orderId,
      productId,
    };
  
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/update-admin-order`,
        payload,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      window.location.reload()
      setUpdateOrder(res.data);
      setLoading(false)

    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false); // Set loading to false when fetching completes
    }
  };

 
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getOrder(currentPage); // Fetch orders based on keyword after debounce
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(delayDebounceFn); // Cleanup timeout on keyword change
  }, [keyword]); // Only depend on keyword

  useEffect(() => {
    getOrder(currentPage); // Fetch orders immediately when filters or current page change
  }, [orderFilter, paymentFilter, currentPage]);

 



  // Helper function to format order status
  const formatStatus = (status) => {
    switch (status) {
      case 'pending':
        return (
          <div className="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3">
            <i className="bx bxs-circle align-middle me-1"></i>Pending
          </div>
        );
      case 'succeeded':
        return (
          <div className="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3">
            <i className="bx bxs-circle align-middle me-1"></i>succeeded
          </div>
        );
      case 'failed':
        return (
          <div className="badge rounded-pill text-danger bg-light-info p-2 text-uppercase px-3">
            <i className="bx bxs-circle align-middle me-1"></i>Failed
          </div>
        );
    
    }
  };
  return (
    <>
      <AdminHeader/>
      <div className="page-wrapper">
        <div className="page-content">
          {/*breadcrumb*/}
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
                    Manage Orders
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          {/*end breadcrumb*/}
          <div className="card">
            <div className="card-body">
              <div className="d-lg-flex align-items-center mb-4 gap-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control ps-5 radius-30"
                    
                    placeholder="User ID"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                          />
                  <span onClick={handleSearch} className="position-absolute top-50 product-show translate-middle-y">
                    <i className="bx bx-search" />
                  </span>
                </div>
                <div>
                {/* <button type="button" className="btn btn-white">Filter By Payment </button> */}
                <Select
                    placeholder="Filter by Payment"
                    style={{ width: 200 }}
                    options={paymentStatusOptions}
                    onChange={handlePaymentFilterChange}
                  />
                </div>
                <div>
                <Select
                    placeholder="Filter by Order"
                    style={{ width: 200 }}
                    options={orderStatusOptions}
                    onChange={handleOrderFilterChange}
                  />
                </div>
{/* 
                <div className="ms-auto">
                  <a href="#" className="btn btn-sm btn-primary mt-2 mt-lg-0">
                    <i className="bx bxs-plus-square" />
                    Add New Product
                  </a>
                </div> */}
              </div>

              {loading ? (
                <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><Spin  size="large" className="spin-overlay" /></div>
              ) : (
               
               <table className="table mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Order#</th>
                    <th>Customer Email</th>

                    <th>Product</th>

                    <th>Payment Status</th>
                    <th>Order Status</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>View Details</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>

                {filteredPayment.length > 0 ? (
                    filteredPayment.map((order, index) => (
                      <tr key={order._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="ms-2">
                              <h6 className="mb-0 font-14">{(currentPage - 1) * pageSize + index + 1}</h6>
                            </div>
                          </div>
                        </td>
                        <td>{order.email}</td>
                        <td>
                          {/* Join product names with a comma or any other separator */}
                          {order.productDetails.map(product => product.name).join(', ')}
                        </td>
                        <td>{formatStatus(order.paymentDetails.payment_status)}</td>
                        <td>
                          <div className="d-flex order-actions">
                            <Select
                              defaultValue={order.productDetails[0].orderStatus || 'Pending'} // Default to Pending if no status
                              onChange={(value) => updateOrderStatus(order._id, order.productDetails[0].productId, value)}
                              options={orderStatusOptions}
                              style={{ width: 150 }}
                            />
                          </div>
                        </td>
                        <td>${order.totalAmount}</td>
                        <td>{formatOrderDate(order.createdAt)}</td>
                        <td>
                          <button 
                            className="btn-donate" 
                            onClick={() => {
                              navigate(`/sellers-orders-details/${order._id}`);
                              window.location.reload();
                            }}
                          >
                            View Details
                          </button>
                        </td>
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
                        <td colSpan="8">No orders found.</td>
                      </tr>
                    )}

                </tbody>
              </table>

                    )}

                       {/* Pagination Controls */}
                     <div className="pagination mt-4">
                         <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={totalOrders}
                        onChange={handlePageChange}
                        className="flex justify-center mt-4"
                    />
                    </div>
                    
            </div>
          </div>
        </div>
      </div>
     <AdminFooter/>
    </>

  )
}

export default AdminManageOrder
