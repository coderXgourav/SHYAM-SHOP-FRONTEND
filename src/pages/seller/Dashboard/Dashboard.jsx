import React, { useEffect } from "react";
import SellerHeader from "../../../components/seller/SellerHeader";
import SellerFooter from "../../../components/seller/SellerFooter";
import axios from "axios";
import { useState } from "react";
import LineChart from "./charts/LineChart";
import { jwtDecode } from "jwt-decode";
import BarChart from "./charts/BarChart";
import { Select } from "antd"; // Importing Ant Design Select

const { Option } = Select; // Destructure Option from Select


const Dashboard = () => {
  const [sellersData, setSellersData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [monthlyEarnings, setMonthlyEarnings] = useState([]);
  const [labels, setLabels] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  const [totalEarning, setTotalEarning] = useState(null);

  const [totalSellerEarning, setTotalSellerEarning] = useState([]);

  const [productSales, setProductSales] = useState([]);

  const [recentOrders, setRecentOrders] = useState([]);

  const [individualEarnings, setIndividualEarnings] = useState([]);
  const [individualLabels, setIndividualLabels] = useState([]);

  const [filter, setFilter] = useState("monthly"); // Filter state for monthly or individual earnings
  const [chartData, setChartData] = useState([]);

  const token = localStorage.getItem("sellerToken");
  const decodedToken = token && jwtDecode(token); // Decode the token
  const sellerId = decodedToken.sellerToken._id; // Access the _id
  console.log("Seller ID:", sellerId);
  console.log("sellerdata", sellersData);


  console.log("totalearning", totalEarning);

  console.log("productSales", productSales);
  console.log("productData", productData);

  console.log("recentOrders", recentOrders);

  console.log("allorder",allOrders)
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/seller/get-seller-orders?seller_id=${sellerId}`,
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      setAllOrders(res.data.orders);
      updateChartData("monthly", res.data.orders); // Set default filter as monthly

       //
       const filteredOrders = res.data.orders.filter(
        (order) => order.paymentDetails.payment_status === "succeeded"
      );
      setProductSales(filteredOrders);


         // calculate 10recent order
         if (res.data.status) {
          const sortedOrders = res.data.orders
            .filter((order) => order.paymentDetails.payment_status !== "failed")
            .slice(0, 10); // Get only the latest 10 orders
  
          setRecentOrders(sortedOrders);
        }
  

    } catch (error) {
      console.log(error.message);
    }
  };

  const calculateMonthlyEarnings = (orders) => {
    const monthlyEarningsMap = {};
    orders.forEach((order) => {
      order.productDetails.forEach((product) => {
        const orderDate = new Date(order.createdAt);
        const month = orderDate.toLocaleString("default", { year: "numeric", month: "short" });
        const earning = product.price * product.quantity;

        monthlyEarningsMap[month] = (monthlyEarningsMap[month] || 0) + earning;
      });
    });

    const sortedMonths = Object.keys(monthlyEarningsMap).sort((a, b) => new Date(a) - new Date(b));
    const sortedEarnings = sortedMonths.map((month) => monthlyEarningsMap[month]);

    return { labels: sortedMonths, data: sortedEarnings };
  };

  const calculateIndividualEarnings = (orders) => {
    const labels = [];
    const data = [];

    orders.forEach((order) => {
      order.productDetails.forEach((product) => {
        const orderDate = new Date(order.createdAt).toLocaleDateString();
        labels.push(orderDate);
        data.push(product.earnings);
      });
    });

    return { labels, data };
  };

  const updateChartData = (selectedFilter, orders) => {
    let chartData;
    if (selectedFilter === "monthly") {
      chartData = calculateMonthlyEarnings(orders);
    } else {
      chartData = calculateIndividualEarnings(orders);
    }
    setLabels(chartData.labels);
    setChartData(chartData.data);
  };

  const handleFilterChange = (value) => {
    setFilter(value); // Update filter state with the selected value
    updateChartData(value, allOrders); // Update chart data based on new filter
  };



  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/seller/get-all-users`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `${token}`,
          },
        }
      );
      setUserCount(res.data.count);
      console.log("All users:", res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/seller/get-all-products`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `${token}`,
          },
        }
      );
      setProductCount(res.data.productscount);
      setProductData(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSellerDertails = async () => {
    try {
      // Optionally, refetch sellers after approval
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/seller/get-single-seller`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `${token}`,
          },
        }
      );
      setSellersData(response.data.data);
      setTotalEarning(response.data.data.totalEarning)
    } catch (error) {
      console.error("Error approving seller:", error);
    }
  };
  useEffect(() => {
    getSellerDertails();
    getAllProducts();
    getAllUsers();
  }, []);

  // Sample earnings data (replace this with actual earnings data from seller)
  // Use the actual earnings from the API data
  // const earningsData = sellersData ? sellersData.earnings : 0;

  const earningsData = sellersData ? [0, 0, 0, 0, 0, sellersData.earnings] : [];

  return (
    <>
      <SellerHeader />
      <div className="page-wrapper">
        <div className="page-content">
          <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
            <div className="col cardTranslate">
              <div className="card radius-10">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">Revenue</p>
                      <h4 className="my-1">${totalEarning}</h4>
                      <p className="mb-0 font-13 text-success">
                        <i className="bx bxs-up-arrow align-middle" />
                        $34 Since last week
                      </p>
                    </div>
                    <div className="widgets-icons bg-light-success text-success ms-auto">
                      <i className="bx bxs-wallet" />
                    </div>
                  </div>
                  <div id="chart1" />
                </div>
              </div>
            </div>
            <div className="col cardTranslate">
              <div className="card radius-10">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">Total Customers</p>
                      <h4 className="my-1">{userCount}</h4>
                      <p className="mb-0 font-13 text-success">
                        <i className="bx bxs-up-arrow align-middle" />
                        14% Since last week
                      </p>
                    </div>
                    <div className="widgets-icons bg-light-warning text-warning ms-auto">
                      <i className="bx bxs-group" />
                    </div>
                  </div>
                  <div id="chart2" />
                </div>
              </div>
            </div>
            <div className="col cardTranslate">
              <div className="card radius-10">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">Seller Products</p>
                      <h4 className="my-1">{productCount}</h4>
                      <p className="mb-0 font-13 text-danger">
                        <i className="bx bxs-down-arrow align-middle" />
                        12.4% Since last week
                      </p>
                    </div>
                    <div className="widgets-icons bg-light-danger text-danger ms-auto">
                      <i className="bx bxs-binoculars" />
                    </div>
                  </div>
                  <div id="chart3" />
                </div>
              </div>
            </div>
          </div>
          {/*end row*/}

          {/* Line Chart for Earnings */}
          <div className="row">
            <div className="col-lg-7">
              <div className="card radius-10" style={{ height: "58vh" }}>
                <div className="card-body my-2">
                 
            {/* Filter Selection using Ant Design Select */}
                   {/* Filter Selection using Ant Design Select */}
                    <div className="filter-container  d-flex my-3">
                    <h5 className="card-title px-4">Earnings Over Time</h5>
                      
                    </div>
                    <div className="px-4">
                    <Select
                        id="earningsFilter"
                        value={filter}
                        style={{ width: 200 }} // Set width for the select
                        onChange={handleFilterChange}
                        placeholder="Select Earnings View" // Set placeholder here
                      >
                        <Option value="monthly">Monthly Earnings</Option>
                        <Option value="individual">Individual Order Earnings</Option>
                      </Select>
                    </div>

                  <div className="chart-container my-5 ">
                    {/* Pass the actual earnings data to the LineChart component */}
                    {/* <LineChart data={monthlyEarnings} labels={labels} /> */}

                    <LineChart data={chartData} labels={labels} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col d-flex col-lg-5">
              <div className="card radius-10 w-100">
                <div className="card-header border-bottom-0">
                  <div className="d-flex align-items-center">
                    <div>
                      <h5 className="mb-1">Top Products</h5>
                      <p className="mb-0 font-13 text-secondary">
                        <i className="bx bxs-calendar" />
                        in last 30 days revenue
                      </p>
                    </div>
                    <div className="dropdown ms-auto">
                      <a
                        className="dropdown-toggle dropdown-toggle-nocaret"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        {" "}
                        <i className="bx bx-dots-horizontal-rounded font-22 text-option" />
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="javascript:;">
                            Action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="javascript:;">
                            Another action
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a className="dropdown-item" href="javascript:;">
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div
                  className="product-list p-3 mb-3 "
                  style={{ maxHeight: "400px", overflow: "auto" }}
                >
                  {productSales.map((order) =>
                    order.productDetails.map((product) => (
                      <div
                        key={product.productId}
                        className="row border mx-0 mb-3 py-2 radius-10 cursor-pointer"
                      >
                        <div className="col-sm-6">
                          <div className="d-flex align-items-center">
                            <div className="product-img">
                              <img
                                src={`${process.env.REACT_APP_API_URL}/upload/${product?.images}`}
                                alt={product.name}
                              />
                            </div>
                            <div className="ms-2">
                              <h6 className="mb-1">{product.name}</h6>
                              <p className="mb-0">
                                ${product.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm">
                          <h6 className="mb-1">
                            ${(product.price * product.quantity).toFixed(2)}
                          </h6>
                          <p className="mb-0">{product.quantity} Sales</p>
                        </div>
                        <div className="col-sm">
                          <div id={`chart-${product.productId}`} />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row ">
            <div className="col-lg-7 d-flex">
              <div className="card radius-10 w-100">
                <div className="p-4">
                  <BarChart products={productData} />
                </div>
              </div>
            </div>
            <div className="col-lg-5 d-flex">
              <div className="card radius-10 w-100">
                <div className="p-4">
                  <div className="d-flex align-items-center">
                    <div>
                      <h5 className="mb-0">Top Categories</h5>
                    </div>
                    <div className="dropdown ms-auto">
                      <a
                        className="dropdown-toggle dropdown-toggle-nocaret"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        <i className="bx bx-dots-horizontal-rounded font-22 text-option" />
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="javascript:;">
                            Action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="javascript:;">
                            Another action
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a className="dropdown-item" href="javascript:;">
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-5" id="chart15" />
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
                    Kids{" "}
                    <span className="badge bg-success rounded-pill">25</span>
                  </li>
                  <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
                    Women{" "}
                    <span className="badge bg-danger rounded-pill">10</span>
                  </li>
                  <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
                    Men{" "}
                    <span className="badge bg-primary rounded-pill">65</span>
                  </li>
                  <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
                    Furniture{" "}
                    <span className="badge bg-warning text-dark rounded-pill">
                      14
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/*end row*/}
          {/*end row*/}
          <div className="card radius-10" style={styles.card}>
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div>
                  <h5 className="mb-0">Recent Orders</h5>
                </div>
                <div className="font-22 ms-auto">
                  <i className="bx bx-dots-horizontal-rounded" />
                </div>
              </div>
              <hr />
              <div className="table-responsive">
                {loading ? (
                  <p>Loading...</p>
                ) : recentOrders.length > 0 ? (
                  <table className="table align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Order ID</th>
                        <th>Product</th>
                        <th>User email</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Status</th>
                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div
                                className="recent-product-img"
                                style={styles.imageContainer}
                              >
                                <img
                                  src={`${
                                    process.env.REACT_APP_API_URL
                                  }/upload/${
                                    order.productDetails[0]?.images ||
                                    "default-image.png"
                                  }`}
                                  alt="Product"
                                  style={styles.image}
                                />
                              </div>
                              <div className="ms-2">
                                <h6 className="mb-1 font-14">
                                  {order.productDetails[0]?.name || "Unknown"}
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td>{order.email}</td>
                          <td>
                            {new Date(order.createdAt).toLocaleDateString()}{" "}
                            {new Date(order.createdAt).toLocaleTimeString()}
                          </td>

                          <td>
                            $
                            {order.productDetails
                              .reduce(
                                (total, product) =>
                                  total + product.price * product.quantity,
                                0
                              )
                              .toFixed(2)}
                          </td>
                          <td>
                            <div
                              className={`d-flex align-items-center text-${getStatusColor(
                                order.paymentDetails.payment_status
                              )}`}
                            >
                              <i className="bx bx-radio-circle-marked bx-burst bx-rotate-90 align-middle font-18 me-1" />
                              <span>{order.paymentDetails.payment_status}</span>
                            </div>
                          </td>
                          {/* <td>
                            <div className="d-flex order-actions">
                              <a href="#" className="text-secondary">
                                <i className="bx bx-cog" />
                              </a>
                              <a href="#" className="text-secondary ms-4">
                                <i className="bx bx-down-arrow-alt" />
                              </a>
                            </div>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No recent orders found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SellerFooter />
    </>
  );
};

// Utility function to determine color class based on order status
const getStatusColor = (status) => {
  switch (status) {
    case "succeeded":
      return "success";
    case "pending":
      return "danger";
    case "Dispatched":
      return "primary";
    default:
      return "secondary";
  }
};

// Basic styles for components
const styles = {
  card: {
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
  },
  imageContainer: {
    width: "40px",
    height: "40px",
    borderRadius: "5px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export default Dashboard;
