import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Pagination,Popconfirm , Spin,message } from "antd";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminFooter from "../../components/admin/AdminFooter";
import { useParams } from "react-router-dom";

const AdminCouponManage = () => {
  const [couponData, setCouponData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
    const couponCode=useParams()
  const pageSize = 10;



  const handleDeleteCoupon = async (couponCode) => {
    setLoading(true)
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/coupons/delete-coupons/${couponCode}`, {
        headers: {
          Authorization: `${Cookies.get("adminToken")}`,
        },

      });
      console.log(res.data);
      message.success("Coupon deleted successfully");
      window.location.reload();
      setLoading(false)
    } catch (error) {
        message.error("Error deleting coupon");
        console.log('error',error.message)
        console.error("Error Response data:", error.response.data);
    }
  }

  const getCoupons = async () => {
    setLoading(true);
    
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/coupons/get-coupons`, {
        headers: {
          Authorization: `${Cookies.get("adminToken")}`,
        },
        params: {
          page: currentPage,
          limit: pageSize, // Fetch 10 coupons per page
        },
      });
      setCouponData(res.data.paginatedCoupons);
      setTotalPages(Math.ceil(res.data.total_count / pageSize));
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // window.location.reload();
    getCoupons();
  }, [currentPage]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
                    Manage Coupons
                  </li>
                </ol>
              </nav>
            </div>
          </div>


         

        
          <div className="card">
          <div className="d-lg-flex align-items-center mb-4 mt-3 px-2 gap-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control ps-5 radius-30"
                    placeholder="Search coupon"
                  />
                  <span className="position-absolute top-50 product-show translate-middle-y">
                    <i className="bx bx-search" />
                  </span>
                </div>

                <div className="ms-auto">
                  <a
                    href="/admin/create-coupons"
                    className="btn btn-sm btn-primary mt-2 mt-lg-0"
                  >
                    <i className="bx bxs-plus-square" />
                    Create New Coupon
                  </a>
                </div>
              </div>
            <div className="card-body">
              {loading ? (
               <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><Spin  size="large" className="spin-overlay" /></div>
              ) : (
                <div className="table-responsive" style={{zoom: 0.9,overflowY: "hidden"}}>
                  <table className="table mb-0">
                    <thead className="table-light">
                      <tr>
                      <th>Coupon#</th>
                        <th>Coupon Code</th>
                        <th>Discount Type</th>
                        <th>Discount Value</th>
                        <th>Min Purchase</th>
                        <th style={{maxWidth: "200px"}}>Max Discount </th>
                        <th>Expiration Date</th>
                        <th>Status</th>
                        <th> View Details</th>

                       
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {couponData.length > 0 ? (
                        couponData.map((coupon,index) => (
                          <tr key={coupon._id}>

<td>
                          <div className="d-flex align-items-center">
                            <div className="ms-2">
                              <h6 className="mb-0 font-14">{(currentPage - 1) * pageSize + index + 1}</h6>
                            </div>
                          </div>
                        </td>

                            <td>{coupon.code}</td>
                            <td>{coupon.discountType}</td>
                            <td>{coupon.discountValue}</td>
                            <td>{coupon.minimumPurchase || "N/A"}</td>
                            <td>{coupon.maxDiscountAmount || "N/A"}</td>
                            <td>{formatDate(coupon.expirationDate)}</td>
                           
                            <td>
                            {coupon.time_usage !== 0 ? (
                                <div className="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3">
                                <i className="bx bxs-circle align-middle me-1"></i>Active
                                </div>
                            ) : (
                                <div className="badge rounded-pill text-danger bg-light-info p-2 text-uppercase px-3">
                                <i className="bx bxs-circle align-middle me-1"></i>Inactive
                                </div>
                            )}
                            </td>
 
                            <td>
                            < a href={`/admin-coupons-details/${coupon.code}`}>


                                <button
                                type="button"
                                className="btn btn-primary btn-sm radius-30 px-4"
                              >
                                View Details
                              </button>
                                </a>
                            </td>

                            <td>
                              <div className="d-flex order-actions">
                                <a  href={`/admin-update-coupons/${coupon.code}`} className="">
                                  <i className="bx bxs-edit"></i>
                                </a>
                                {/* <a href="javascript:void(0);" className="ms-3">
                                  <i className="bx bxs-trash"></i>
                                </a> */}

                                  <Popconfirm
                                  title="Are you sure you want to delete this coupon?"
                                  onConfirm={() => handleDeleteCoupon(coupon.code)}
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
                          <td colSpan="8">No coupons found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>  

                  {/* Pagination Controls */}
                  <div className="pagination mt-4">
                    <Pagination
                      current={currentPage}
                      total={totalPages * 10}
                      pageSize={10}
                      onChange={(page) => setCurrentPage(page)}
                      showSizeChanger={false}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminCouponManage;
