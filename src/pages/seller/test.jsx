import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Pagination, Spin, Select } from "antd";
import SellerHeader from '../../components/seller/SellerHeader';
import SellerFooter from '../../components/seller/SellerFooter';
import moment from 'moment';
import { useNavigate } from "react-router-dom";

const ManageOrder = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredPayment, setFilteredPayment] = useState([]);
  const [paymentFilter, setPaymentFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0);
  const pageSize = 10;
  const token = localStorage.getItem("sellerToken");
  const navigate = useNavigate();

  const formatOrderDate = (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  };

  const paymentStatusOptions = [
    { value: '', label: 'Clear Filter' },
    { value: 'pending', label: 'Pending' },
    { value: 'succeeded', label: 'Succeeded' },
    { value: 'failed', label: 'Failed' }
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getOrder = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/seller/get-seller-order?page=${page}&limit=${pageSize}`,
        {
          headers: { token: `${token}` }
        }
      );
      setAllOrders(res.data.orders);
      setTotalOrders(res.data.total_count);
      applyFilter(paymentFilter, res.data.orders);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (filter, orders) => {
    if (filter) {
      const filtered = orders.filter((order) =>
        order.paymentDetails.payment_status === filter
      );
      setFilteredPayment(filtered);
      setTotalOrders(filtered.length); // Update to count filtered orders
    } else {
      setFilteredPayment(orders);
      setTotalOrders(orders.length); // Reset to count all orders
    }
  };

  const handlePaymentFilter = (value) => {
    if (value === '') {
      setPaymentFilter('');
      applyFilter('', allOrders); // Show all orders
      setCurrentPage(1); // Reset to first page
    } else {
      setPaymentFilter(value);
      localStorage.setItem('paymentFilter', value);
      applyFilter(value, allOrders);
      setCurrentPage(1); // Reset to first page when filtering
    }
  };

  useEffect(() => {
    getOrder(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const savedFilter = localStorage.getItem('paymentFilter');
    if (savedFilter) {
      setPaymentFilter(savedFilter);
      applyFilter(savedFilter, allOrders);
    }
  }, []);

  const formatStatus = (status) => {
    switch (status) {
      case 'pending':
        return <div className="badge rounded-pill text-warning">Pending</div>;
      case 'succeeded':
        return <div className="badge rounded-pill text-success">Succeeded</div>;
      case 'failed':
        return <div className="badge rounded-pill text-danger">Failed</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <SellerHeader />
      <div className="page-wrapper">
        <div className="page-content">
          <div className="card">
            <div className="card-body">
              <div className="d-lg-flex align-items-center mb-4 gap-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control ps-5 radius-30"
                    placeholder="Search orders"
                  />
                </div>
                <div>
                  <Select
                    placeholder="Filter by Payment"
                    style={{ width: 200 }}
                    options={paymentStatusOptions}
                    onChange={handlePaymentFilter}
                  />
                </div>
              </div>

              {loading ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Spin size="large" className="spin-overlay" />
                </div>
              ) : (
                <table className="table mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Order#</th>
                      <th>Customer Email</th>
                      <th>Product</th>
                      <th>Payment Status</th>
                      <th>Total</th>
                      <th>Date</th>
                      <th>View Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayment.length > 0 ? (
                      filteredPayment.map((order, index) => (
                        <tr key={order._id}>
                          <td>{(currentPage - 1) * pageSize + index + 1}</td>
                          <td>{order.email}</td>
                          <td>{order.productDetails.map(product => product.name).join(', ')}</td>
                          <td>{formatStatus(order.paymentDetails.payment_status)}</td>
                          <td>${order.totalAmount}</td>
                          <td>{formatOrderDate(order.createdAt)}</td>
                          <td>
                            <button
                              className="btn-donate"
                              onClick={() => navigate(`/sellers-orders-details/${order._id}`)}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">No orders found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

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
      <SellerFooter />
    </>
  );
};

export default ManageOrder;
