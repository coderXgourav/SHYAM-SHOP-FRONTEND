import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SellerHeader from '../../components/seller/SellerHeader';
import SellerFooter from '../../components/seller/SellerFooter';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css'; // Optional: Import styles
import { Modal, Pagination, Spin,message,Select } from "antd";


const ViewOrderDetails = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const [singleOrder, setSingleOrder] = useState(null);

  const[isLoading,setIsLoading]=useState(false);

  const token = localStorage.getItem("sellerToken");
  const scrollbarRef = useRef(null); // Ref for PerfectScrollbar

  const getSingleOrderData = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/seller/get-single-seller-orders/${orderId}`, {
        headers: { token: `${token}` }
      });
      setSingleOrder(res.data.order);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log("Unable to fetch order");
    }
  };

  useEffect(() => {
    getSingleOrderData();
  }, [orderId]);

  

  return (
    <>
      <SellerHeader />
      <div className="page-wrapper">
        <div className="page-content" > {/* Attach the ref here */}
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
                    Order Details
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          {isLoading? (<span style={{display:"flex",justifyContent:"center",alignItems:"center"}}> <Spin size='large'/> </span>):(<>
            <div className="order-details my-4">
          <h5 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Order Summary</h5>
                  <div className="order-summary my-8 p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">

          {/* Table for Order Details */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <tbody className="bg-white divide-y divide-gray-200 text-gray-800">
                <tr>
                  <td className="py-2 px-4 font-medium text-left">Order ID</td>
                  <td className="py-2 px-4 text-right text-blue-600 font-semibold">{singleOrder?._id}</td>
                </tr>

                <tr>
                  <td className="py-2 px-4 font-medium text-left">Email</td>
                  <td className="py-2 px-4 text-right">{singleOrder?.email}</td>
                </tr>

                <tr>
                  <td className="py-2 px-4 font-medium text-left">Total Amount</td>
                  <td className="py-2 px-4 text-right text-green-600 font-semibold">${singleOrder?.totalAmount}</td>
                </tr>

                <tr>
                  <td className="py-2 px-4 font-medium text-left">Payment Status</td>
                        <td style={{ padding: '0.5rem 1rem', textAlign: 'start' }}>
                      <span
                        style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          backgroundColor: singleOrder?.paymentDetails?.payment_status === 'pending'
                            ? '#FEF3C7' // Corresponds to Tailwind's `bg-yellow-100`
                            : singleOrder?.paymentDetails?.payment_status === 'failed'
                            ? '#FEE2E2' // Corresponds to Tailwind's `bg-red-100`
                            : '#D1FAE5', // Corresponds to Tailwind's `bg-green-100`
                          color: singleOrder?.paymentDetails?.payment_status === 'pending'
                            ? '#B45309' // Corresponds to Tailwind's `text-yellow-700`
                            : singleOrder?.paymentDetails?.payment_status === 'failed'
                            ? '#B91C1C' // Corresponds to Tailwind's `text-red-700`
                            : '#065F46', // Corresponds to Tailwind's `text-green-700`
                        }}
                      >
                        {singleOrder?.paymentDetails?.payment_status}
                      </span>
                    </td>


                </tr>

                <tr>
                  <td className="py-2 px-4 font-medium text-left">Shipping Method</td>
                  <td className="py-2 px-4 text-right">{singleOrder?.shipping_options[0]?.shipping_rate}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>



            <h5 className='my-4'>Product Details</h5>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {singleOrder?.productDetails?.map(product => (
                    <tr key={product.productId}>
                      <td>
                        <img 
                         src={`${process.env.REACT_APP_API_URL}/upload/${product?.images[0]}`}

                          alt={product?.name} 
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                        />
                      </td>
                      <td>{product?.name}</td>
                      <td>${product?.price}</td>
                      <td>{product?.quantity}</td>
                      <td>{product?.orderStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            
            <div className="overflow-x-auto">
  <h5 className="text-lg font-semibold mb-4">Shipping Address</h5>
  {singleOrder?.user_address ? (
    (() => {
      let address = {};
      try {
        // Safely parsing user address
        address = JSON.parse(singleOrder.user_address)?.address;
      } catch (e) {
        console.error("Error parsing user address:", e);
      }
      return (
        <table className="min-w-full table-auto">
          <tbody className="bg-white divide-y divide-gray-200 text-gray-800">
            <tr>
              <td className="py-2 px-4 font-medium text-left">Full Name</td>
              <td className="py-2 px-4 text-right">{address?.full_name}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium text-left">Address</td>
              <td className="py-2 px-4 text-right">{address?.address}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium text-left">City</td>
              <td className="py-2 px-4 text-right">{address?.city}, {address?.state}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium text-left">Pincode</td>
              <td className="py-2 px-4 text-right">{address?.pincode}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium text-left">Phone</td>
              <td className="py-2 px-4 text-right">{address?.phone_number}</td>
            </tr>

            <tr>
              <td className="py-2 px-4 font-medium text-left">Order Date:</td>
              <td className="py-2 px-4 text-right">{new Date(singleOrder?.createdAt).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      );
    })()
  ) : (
    <p className="text-gray-600">No shipping address available.</p>
  )}
</div>




           
          </div>
          </>)}
          
        </div>
      </div>

      <SellerFooter />
    </>
  );
};

export default ViewOrderDetails;
