import { useEffect, useState } from "react";

import axios from "axios";
import Cookies from "js-cookie";
import { Modal, Pagination, Spin,message,Select } from "antd";
import SellerHeader from '../../components/seller/SellerHeader'
import SellerFooter from '../../components/seller/SellerFooter'

import moment from 'moment';
import { useNavigate } from "react-router-dom";
import ViewOrderDetails from "./ViewOrderDetail";


const ManageOrder = (page=1) => {
  const [allOrders,setAllOrders]=useState([])
  const [totalPages, setTotalPages] = useState(1);
  const [filteredPayment,setFilteredPayment]=useState([])
  const[filteredOrders,setFilteredOrder]=useState([])
  const [paymentFilter,setPaymentFilter]=useState('')

  //updateorderStatus
  const [updateOrder,setUpdateOrder]=useState([])
  const navigate=useNavigate()

   //pagination
   const [currentPage, setCurrentPage] = useState(1); // Track current page
   const [loading, setLoading] = useState(true); // Track loading state
   const [totalOrders, setTotalOrders] = useState(0); // Store total orders for pagination
   const pageSize = 10; // Number of products per page

  const token = localStorage.getItem("sellerToken");


    console.log("allorders",allOrders)

    console.log("totalorder",totalOrders)

    console.log("current",currentPage)

    console.log("filteredpayment",filteredPayment)



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



  

    const handlePageChange = (page) => {
        setCurrentPage(page);
        getOrder(page); // Fetch the orders for the selected page
      };

  const getOrder = async (page) => {
    setLoading(true); // Set loading to true when fetching starts

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/seller/get-seller-order?page=${page}&limit=${pageSize}`,
        {
          headers: {
            token: `${token}`,
          }
        }
      );
      // setOrderStatusSelect(res.data.orders.productDetails.orderStatus)
      setAllOrders(res.data.orders);
      setTotalOrders(res.data.total_count);
      setCurrentPage(res.data.currentPage);

      //fetch all filtered payment
      // applyFilter(paymentFilter, res.data.orders);

       // Apply payment filter if it exists
    if (paymentFilter) {
      applyFilter(paymentFilter, res.data.orders);
    } else {
      setFilteredPayment(res.data.orders); // Show all orders if no filter is applied
    }


    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false); // Set loading to false when fetching completes
    }
  };

  const applyFilter = (filter, orders) => {
  let filtered = orders;
  if (filter) {
    filtered = orders.filter((order) =>
      order.paymentDetails.payment_status === filter
    );
  }
  
  setFilteredPayment(filtered);
  setTotalOrders(filtered.length); // Update the total orders count for pagination
};


  const handleOrderFilter=()=>{

  }

  // Handle payment filter change
const handlePaymentFilter = (value) => {
  // Prevent any default form submission or reload
  if (value === '') {
    setPaymentFilter('');
    applyFilter('', allOrders); // Show all orders if "Clear Filter" is selected
    // Reset to show all orders if "Clear Filter" is selected
    // window.location.reload();
    setCurrentPage(1); // Reset to first page when clearing filter
  } else {
    setPaymentFilter(value);
    localStorage.setItem('paymentFilter', value);
    applyFilter(value, allOrders);
    setCurrentPage(1); // Reset to first page when clearing filter
   
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
        `${process.env.REACT_APP_API_URL}/order/update-seller-order`,
        payload,
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      // window.location.reload()
      setUpdateOrder(res.data);
      setLoading(false)

    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false); // Set loading to false when fetching completes
    }
  };

 
  useEffect(() => {
    getOrder(currentPage);
  }, [currentPage]);

  useEffect(() => {
    // Retrieve the filter from localStorage on mount
    const savedFilter = localStorage.getItem('paymentFilter');
    if (savedFilter) {
      setPaymentFilter(savedFilter);
      applyFilter(savedFilter, allOrders); // Apply the saved filter
    }
  }, []);



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
      <SellerHeader/>
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
                    placeholder="Search orders"
                  />
                  <span className="position-absolute top-50 product-show translate-middle-y">
                    <i className="bx bx-search" />
                  </span>
                </div>
                <div>
                {/* <button type="button" className="btn btn-white">Filter By Payment </button> */}
                <Select
                    placeholder="Filter by Payment"
                    style={{ width: 200 }}
                    options={paymentStatusOptions}
                    onChange={handlePaymentFilter}
                  />
                </div>
                <div>
                <Select
                    placeholder="Filter by Order"
                    style={{ width: 200 }}
                    options={orderStatusOptions}
                    onChange={handleOrderFilter}
                  />
                </div>

                <div className="ms-auto">
                  <a href="#" className="btn btn-sm btn-primary mt-2 mt-lg-0">
                    <i className="bx bxs-plus-square" />
                    Add New Product
                  </a>
                </div>
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
     <SellerFooter/>
    </>
  );
};



export default ManageOrder;







// import AdminFooter from "../../../components/admin/AdminFooter";
// import AdminHeader from "../../../components/admin/AdminHeader";

// const AdminManageOrder = () => {
//   return (
//     <>
//       <AdminHeader />
//       <div className="page-wrapper">
//         <div className="page-content">
//           {/*breadcrumb*/}
//           <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
//             <div className="ps-3">
//               <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb mb-0 p-0">
//                   <li className="breadcrumb-item">
//                     <a href="javascript:void(0);">
//                       <i className="bx bx-home-alt" />
//                     </a>
//                   </li>
//                   <li className="breadcrumb-item active" aria-current="page">
//                     Manage Orders
//                   </li>
//                 </ol>
//               </nav>
//             </div>
//           </div>
//           {/*end breadcrumb*/}
//           <div className="card">
//             <div className="card-body">
//               <div className="d-lg-flex align-items-center mb-4 gap-3">
//                 <div className="position-relative">
//                   <input
//                     type="text"
//                     className="form-control ps-5 radius-30"
//                     placeholder="Search orders"
//                   />
//                   <span className="position-absolute top-50 product-show translate-middle-y">
//                     <i className="bx bx-search" />
//                   </span>
//                 </div>
//                 <div className="ms-auto">
//                   <a href="#" className="btn btn-sm btn-primary mt-2 mt-lg-0">
//                     <i className="bx bxs-plus-square" />
//                     Add New Order
//                   </a>
//                 </div>
//               </div>
//               <div className="table-responsive">
//                 <table className="table mb-0">
//                   <thead className="table-light">
//                     <tr>
//                       <th>Order#</th>
//                       <th>Company Name</th>
//                       <th>Status</th>
//                       <th>Total</th>
//                       <th>Date</th>
//                       <th>View Details</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>
//                         <div className="d-flex align-items-center">
//                           <div>
//                             <input
//                               className="form-check-input me-3"
//                               type="checkbox"
//                               value=""
//                               aria-label="..."
//                             />
//                           </div>
//                           <div className="ms-2">
//                             <h6 className="mb-0 font-14">#OS-000354</h6>
//                           </div>
//                         </div>
//                       </td>
//                       <td>Gaspur Antunes</td>
//                       <td>
//                         <div className="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3">
//                           <i className="bx bxs-circle me-1"></i>Fulfilled
//                         </div>
//                       </td>
//                       <td>$485.20</td>
//                       <td>June 10, 2020</td>
//                       <td>
//                         <button
//                           type="button"
//                           className="btn btn-primary btn-sm radius-30 px-4"
//                         >
//                           View Details
//                         </button>
//                       </td>
//                       <td>
//                         <div className="d-flex order-actions">
//                           <a href="javascript:void(0);" className="">
//                             <i className="bx bxs-edit"></i>
//                           </a>
//                           <a
//                             href="javascript:void(0);"
//                             className="ms-3"
//                           >
//                             <i className="bx bxs-trash"></i>
//                           </a>
//                         </div>
//                       </td>
//                     </tr>


//                     <tr>
//                       <td>
//                         <div className="d-flex align-items-center">
//                           <div>
//                             <input
//                               className="form-check-input me-3"
//                               type="checkbox"
//                               value=""
//                               aria-label="..."
//                             />
//                           </div>
//                           <div className="ms-2">
//                             <h6 className="mb-0 font-14">#OS-000354</h6>
//                           </div>
//                         </div>
//                       </td>
//                       <td>Gaspur Antunes</td>
//                       <td>
//                         <div className="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3">
//                           <i className="bx bxs-circle me-1"></i>Fulfilled
//                         </div>
//                       </td>
//                       <td>$485.20</td>
//                       <td>June 10, 2020</td>
//                       <td>
//                         <button
//                           type="button"
//                           className="btn btn-primary btn-sm radius-30 px-4"
//                         >
//                           View Details
//                         </button>
//                       </td>
//                       <td>
//                         <div className="d-flex order-actions">
//                           <a href="javascript:void(0);" className="">
//                             <i className="bx bxs-edit"></i>
//                           </a>
//                           <a
//                             href="javascript:void(0);"
//                             className="ms-3"
//                           >
//                             <i className="bx bxs-trash"></i>
//                           </a>
//                         </div>
//                       </td>
//                     </tr>



//                     <tr>
//                       <td>
//                         <div className="d-flex align-items-center">
//                           <div>
//                             <input
//                               className="form-check-input me-3"
//                               type="checkbox"
//                               value=""
//                               aria-label="..."
//                             />
//                           </div>
//                           <div className="ms-2">
//                             <h6 className="mb-0 font-14">#OS-000354</h6>
//                           </div>
//                         </div>
//                       </td>
//                       <td>Gaspur Antunes</td>
//                       <td>
//                         <div className="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3">
//                           <i className="bx bxs-circle me-1"></i>Fulfilled
//                         </div>
//                       </td>
//                       <td>$485.20</td>
//                       <td>June 10, 2020</td>
//                       <td>
//                         <button
//                           type="button"
//                           className="btn btn-primary btn-sm radius-30 px-4"
//                         >
//                           View Details
//                         </button>
//                       </td>
//                       <td>
//                         <div className="d-flex order-actions">
//                           <a href="javascript:void(0);" className="">
//                             <i className="bx bxs-edit"></i>
//                           </a>
//                           <a
//                             href="javascript:void(0);"
//                             className="ms-3"
//                           >
//                             <i className="bx bxs-trash"></i>
//                           </a>
//                         </div>
//                       </td>
//                     </tr>



//                     <tr>
//                       <td>
//                         <div className="d-flex align-items-center">
//                           <div>
//                             <input
//                               className="form-check-input me-3"
//                               type="checkbox"
//                               value=""
//                               aria-label="..."
//                             />
//                           </div>
//                           <div className="ms-2">
//                             <h6 className="mb-0 font-14">#OS-000354</h6>
//                           </div>
//                         </div>
//                       </td>
//                       <td>Gaspur Antunes</td>
//                       <td>
//                         <div className="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3">
//                           <i className="bx bxs-circle me-1"></i>Fulfilled
//                         </div>
//                       </td>
//                       <td>$485.20</td>
//                       <td>June 10, 2020</td>
//                       <td>
//                         <button
//                           type="button"
//                           className="btn btn-primary btn-sm radius-30 px-4"
//                         >
//                           View Details
//                         </button>
//                       </td>
//                       <td>
//                         <div className="d-flex order-actions">
//                           <a href="javascript:void(0);" className="">
//                             <i className="bx bxs-edit"></i>
//                           </a>
//                           <a
//                             href="javascript:void(0);"
//                             className="ms-3"
//                           >
//                             <i className="bx bxs-trash"></i>
//                           </a>
//                         </div>
//                       </td>
//                     </tr>
//                     {/* Repeat the similar structure for other rows */}
//                     <tr>
//                       <td>
//                         <div className="d-flex align-items-center">
//                           <div>
//                             <input
//                               className="form-check-input me-3"
//                               type="checkbox"
//                               value=""
//                               aria-label="..."
//                             />
//                           </div>
//                           <div className="ms-2">
//                             <h6 className="mb-0 font-14">#OS-000986</h6>
//                           </div>
//                         </div>
//                       </td>
//                       <td>Gaspur Antunes</td>
//                       <td>
//                         <div className="badge rounded-pill text-info bg-light-info p-2 text-uppercase px-3">
//                           <i className="bx bxs-circle align-middle me-1"></i>
//                           Confirmed
//                         </div>
//                       </td>
//                       <td>$650.30</td>
//                       <td>June 12, 2020</td>
//                       <td>
//                         <button
//                           type="button"
//                           className="btn btn-primary btn-sm radius-30 px-4"
//                         >
//                           View Details
//                         </button>
//                       </td>
//                       <td>
//                         <div className="d-flex order-actions">
//                           <a href="javascript:void(0);" className="">
//                             <i className="bx bxs-edit"></i>
//                           </a>
//                           <a
//                             href="javascript:void(0);"
//                             className="ms-3"
//                           >
//                             <i className="bx bxs-trash"></i>
//                           </a>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <div className="d-flex align-items-center">
//                           <div>
//                             <input
//                               className="form-check-input me-3"
//                               type="checkbox"
//                               value=""
//                               aria-label="..."
//                             />
//                           </div>
//                           <div className="ms-2">
//                             <h6 className="mb-0 font-14">#OS-000536</h6>
//                           </div>
//                         </div>
//                       </td>
//                       <td>Gaspur Antunes</td>
//                       <td>
//                         <div className="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3">
//                           <i className="bx bxs-circle align-middle me-1"></i>
//                           Partially Shipped
//                         </div>
//                       </td>
//                       <td>$159.45</td>
//                       <td>June 14, 2020</td>
//                       <td>
//                         <button
//                           type="button"
//                           className="btn btn-primary btn-sm radius-30 px-4"
//                         >
//                           View Details
//                         </button>
//                       </td>
//                       <td>
//                         <div className="d-flex order-actions">
//                           <a href="javascript:void(0);" className="">
//                             <i className="bx bxs-edit"></i>
//                           </a>
//                           <a
//                             href="javascript:void(0);"
//                             className="ms-3"
//                           >
//                             <i className="bx bxs-trash"></i>
//                           </a>
//                         </div>
//                       </td>
//                     </tr>
//                     {/* Add more rows as needed */}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <AdminFooter />
//     </>
//   );
// };

// export default AdminManageOrder;
