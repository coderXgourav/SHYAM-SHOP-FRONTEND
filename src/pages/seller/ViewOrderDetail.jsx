import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SellerHeader from '../../components/seller/SellerHeader';
import SellerFooter from '../../components/seller/SellerFooter';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css'; // Optional: Import styles

const ViewOrderDetails = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const [singleOrder, setSingleOrder] = useState(null);
  const token = localStorage.getItem("sellerToken");
  const scrollbarRef = useRef(null); // Ref for PerfectScrollbar

  const getSingleOrderData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/seller/get-single-seller-orders/${orderId}`, {
        headers: { token: `${token}` }
      });
      setSingleOrder(res.data.order);
    } catch (error) {
      console.log("Unable to fetch order");
    }
  };

  useEffect(() => {
    getSingleOrderData();
  }, [orderId]);

  useEffect(() => {
    let ps;

    // Only initialize PerfectScrollbar if the ref exists
    if (scrollbarRef.current) {
      ps = new PerfectScrollbar(scrollbarRef.current); // Initialize PerfectScrollbar
    }

    return () => {
      if (ps) {
        ps.destroy(); // Clean up on unmount
      }
    };
  }, [singleOrder]); // Run this whenever singleOrder changes

  if (!singleOrder) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SellerHeader />
      <div className="page-wrapper">
        <div className="page-content" ref={scrollbarRef}> {/* Attach the ref here */}
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

          <div className="order-details my-4">
            <div className="order-summary">
              <p><strong>Order ID:</strong> {singleOrder._id}</p>
              <p><strong>Email:</strong> {singleOrder.email}</p>
              <p><strong>Total Amount:</strong> ${singleOrder.totalAmount}</p>
              <p><strong>Payment Status:</strong> {singleOrder.paymentDetails.payment_status}</p>
              <p><strong>Shipping Method:</strong> {singleOrder.shipping_options[0]?.shipping_rate}</p>
            </div>

            <h5>Product Details</h5>
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
                  {singleOrder.productDetails.map(product => (
                    <tr key={product.productId}>
                      <td>
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.quantity}</td>
                      <td>{product.orderStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h5>Shipping Address</h5>
            <div className="shipping-address">
              <p><strong>Full Name:</strong> {JSON.parse(singleOrder.user_address).address.full_name}</p>
              <p><strong>Address:</strong> {JSON.parse(singleOrder.user_address).address.address}</p>
              <p><strong>City:</strong> {JSON.parse(singleOrder.user_address).address.city}, {JSON.parse(singleOrder.user_address).address.state}</p>
              <p><strong>Pincode:</strong> {JSON.parse(singleOrder.user_address).address.pincode}</p>
              <p><strong>Phone:</strong> {JSON.parse(singleOrder.user_address).address.phone_number}</p>
            </div>

            <p><strong>Order Date:</strong> {new Date(singleOrder.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <SellerFooter />
    </>
  );
};

export default ViewOrderDetails;
