import React, { useState, useEffect } from "react";
import axios from "axios";

const DeliveredOrdersBySeller = () => {
  const [sellers, setSellers] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const token = "YOUR_AUTH_TOKEN"; // Replace with actual token

  useEffect(() => {
    getAllSeller();
    getOrder();
  }, []);

  const getAllSeller = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/admin-get-all-seller`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
          },
        }
      );
      setSellers(res.data.sellers);
    } catch (error) {
      console.log("Error fetching sellers:", error.message);
    }
  };

  const getOrder = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/get-orders`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      
      // Filter only orders with "Delivered" status
      const delivered = res.data.orders
        .flatMap(order => order.productDetails
          .filter(product => product.orderStatus === "Delivered")
          .map(product => ({
            ...product,
            orderId: order._id, // Include order ID for reference
            userAddress: JSON.parse(order.user_address).address,
            totalAmount: order.totalAmount
          }))
        );
      
      setDeliveredOrders(delivered);
    } catch (error) {
      console.log("Error fetching orders:", error.message);
    }
  };

  // Group delivered products by seller
  const groupedOrders = deliveredOrders.reduce((acc, product) => {
    const sellerId = product.sellerId._id;
    if (!acc[sellerId]) {
      const seller = sellers.find(s => s._id === sellerId) || {};
      acc[sellerId] = {
        sellerName: seller.seller_name,
        sellerEmail: seller.seller_email,
        bankName: seller.bank_name,
        ifscCode: seller.ifsc_code,
        accNo: seller.acc_no,
        bankHolderName: seller.bank_holder_name,
        products: []
      };
    }
    acc[sellerId].products.push(product);
    return acc;
  }, {});

  return (
    <div>
      <h2>Delivered Orders by Seller</h2>
      {Object.values(groupedOrders).map((sellerData, index) => (
        <div key={index} style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "15px" }}>
          <h3>{sellerData.sellerName} ({sellerData.sellerEmail})</h3>
          <p><strong>Bank Details:</strong> {sellerData.bankName}, IFSC: {sellerData.ifscCode}</p>
          <p><strong>Account No:</strong> {sellerData.accNo}, Holder: {sellerData.bankHolderName}</p>
          <h4>Delivered Products</h4>
          <ul>
            {sellerData.products.map((product, idx) => (
              <li key={idx}>
                <strong>{product.name}</strong> - Quantity: {product.quantity}, 
                Price: ${product.price}, Earnings: ${product.earnings}
                <p>Order Total: ${product.totalAmount}</p>
                <p>Shipping Address: {product.userAddress.full_name}, {product.userAddress.address}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DeliveredOrdersBySeller;
