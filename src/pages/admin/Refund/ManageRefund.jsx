import React, { useEffect, useState } from 'react';
import { Pagination, Select, Spin, message } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../../components/admin/AdminHeader';
import AdminFooter from '../../../components/admin/AdminFooter';
import {jwtDecode} from 'jwt-decode';

const ManageRefund = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    
    const token = Cookies.get("adminToken");
    const decodedToken = token && jwtDecode(token);
    const navigate = useNavigate();
    

    console.log("allordersss", allOrders)
    const formatOrderDate = (date) => moment(date).format('MMMM Do YYYY, h:mm:ss a');
    
    const returnStatusOptions = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Accepted', label: 'Accepted' },
        { value: 'Rejected', label: 'Rejected' },
    ];

    const getOrder = async (page) => {
        setLoading(true);
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/admin/get-filter-order-return-approval?page=${page}&limit=${pageSize}`,
                { headers: { Authorization: `${token}` } }
            );
            setAllOrders(res.data.orders);
            setTotalOrders(res.data.total_count);
            setCurrentPage(res.data.currentPage);
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const updateReturnStatus = async (orderId, productId, newStatus) => {
        setLoading(true);
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/admin/approve-return`,
                { orderId, productId, returnStatus: newStatus },
                { headers: { Authorization: `${token}` } }
            );
            message.success(response.data.message);
            getOrder(currentPage); // Refresh orders after update
            window.location.reload();

        } catch (error) {
            console.error(error.message);
            message.error('Failed to update return status.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrder(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => setCurrentPage(page);

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
                                        Manage Refunds
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            {loading ? (
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Spin size="large" />
                                </div>
                            ) : (
                                <table className="table mb-0">
                                    <thead className="table-light">
                                        <tr>
                                        <th>No</th>
                                        <th>Date</th>
                                            <th>OrderID</th>
                                            <th>Customer Email</th>
                                            <th>Product</th>
                                            <th>Return Reason</th>
                                            <th>Return Status</th>
                                            <th>Total</th>
                                           
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allOrders.map((order, index) => 
                                            order.productDetails.map((product) => 
                                                product.orderStatus === 'Delivered' && product.returnReason && (
                                                    <tr key={product.productId}>
                                                        <td>{(currentPage - 1) * pageSize + index + 1}</td>
                                                        <td>{formatOrderDate(order.createdAt)}</td>
                                                        <td>{order._id}</td>
                                                        <td>{order.email}</td>
                                                        <td>{product.name}</td>
                                                        <td>{product.returnReason}</td>
                                                        <td>
                                                            <Select
                                                                defaultValue={product.returnStatus || 'Pending'}
                                                                onChange={(value) => updateReturnStatus(order._id, product.productId, value)}
                                                                options={returnStatusOptions}
                                                                style={{ width: 150 }}
                                                            />
                                                        </td>
                                                        <td>${order.totalAmount}</td>
                                                      
                                                    </tr>
                                                )
                                            )
                                        )}
                                    </tbody>
                                </table>
                            )}
                            <Pagination
                                current={currentPage}
                                total={totalOrders}
                                pageSize={pageSize}
                                onChange={handlePageChange}
                                style={{ marginTop: '20px', textAlign: 'center' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <AdminFooter />
        </>
    );
};

export default ManageRefund;
