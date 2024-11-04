import React, { useEffect, useState } from "react";
import SellerFooter from "../../../components/seller/SellerFooter";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminFooter from "../../../components/admin/AdminFooter";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import LineChart from "../../seller/Dashboard/charts/LineChart";
import { Select, Spin } from "antd";
import AdminLineChart from "../Chart/AdminLineChart";
import { Table, Button } from "antd"; // Assuming you're using Ant Design for table and button styling
import jsPDF from "jspdf";
import "jspdf-autotable";
import samlogo from "../../../../src/assets/samlogo.png";


import { Line } from "react-chartjs-2";

// import SellerEarningsAdmin from "../Chart/SellerEarningAdmin";
const { Option } = Select; // Destructure Option from Select

const AdminDashboard = () => {
  const [sellersData, setSellersData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [monthlyEarnings, setMonthlyEarnings] = useState([]);
  const [labels, setLabels] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [adminEarning, setAdminEarning] = useState(null);
  const [totalEarning, setTotalEarning] = useState(null);

  const [productSales, setProductSales] = useState([]);

  const [recentOrders, setRecentOrders] = useState([]);

  const [individualEarnings, setIndividualEarnings] = useState([]);
  // const [labels, setLabels] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("monthly");


  const [orders, setOrders] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [sellers, setSellers] = useState([]);

//seller filter
  const[ sellerOrders, setSellerOrders] = useState([]);
  const [sellersCheck, setCSellersCheck] = useState([]);
  const [selectSeller, setSelectSeller] = useState(null);
  const [earningsDatas, setEarningsDatas] = useState({});



  const [loading, setLoading] = useState(true);
  const [earningsData, setEarningsData] = useState({ monthlyEarnings: {}, individualEarnings: {} });
  const [filterType, setFilterType] = useState('monthly');


  const [sellerss, setSellerss] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  // const navigate=useNavigate()

  const token = Cookies.get("adminToken");
  const decodedToken = token && jwtDecode(token);
  console.log(decodedToken);

  // console.log("monthlyEarnings", monthlyEarnings);

  // console.log("totalEarning", totalEarning);

  // console.log("seller:", sellers);

  // console.log("selelrOreder:", sellerOrders);

  // console.log("checkseller:", sellersCheck);

  console.log("deliveredOrders:", deliveredOrders)

  
  const handleDownloadInvoice = (sellerData) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
        // Add logo image at the top
    const imgWidth = 50; // Adjust the width as needed
    const imgHeight = 15; // Adjust the height as needed
    doc.addImage(samlogo, "PNG", 14, 10, imgWidth, imgHeight);
    // Add title and seller information

    // Center the "Invoice" title
    const title = "Invoice";
    const titleX = (pageWidth - doc.getTextWidth(title)) / 2;
    const startYPosition = 30;
    doc.setFontSize(16);
    doc.text(title, titleX, startYPosition);
    doc.setFontSize(12);
    doc.text(`Seller Name: ${sellerData.sellerName}`, 14, 30);
    doc.text(`Seller Email: ${sellerData.sellerEmail}`, 14, 36);
    
    // Bank Details
    doc.text("Bank Details:", 14, 46);
    doc.text(`Bank Name: ${sellerData.bankName}`, 14, 52);
    doc.text(`IFSC Code: ${sellerData.ifscCode}`, 14, 58);
    doc.text(`Account Holder's Name: ${sellerData.bankHolderName}`, 14, 64);
    doc.text(`Account No: ${sellerData.accNo}`, 14, 70);

    // Table columns
    const columns = [
      { header: "Product Name", dataKey: "name" },
      { header: "Quantity", dataKey: "quantity" },
      { header: "Price", dataKey: "price" },
      { header: "Earnings", dataKey: "earnings" },
      { header: "Total Amount", dataKey: "totalAmount" },
      { header: "Shipping Address", dataKey: "address" }
    ];

    // Format product data for the table
    const rows = sellerData.products.map((product) => ({
      name: product.name,
      quantity: product.quantity,
      price: `$${product.price}`,
      earnings: `$${product.earnings}`,
      totalAmount: `$${product.totalAmount}`,
      address: `${product.userAddress.full_name}, ${product.userAddress.address}`
    }));

    // Add the table of products to the PDF
    doc.autoTable({
      head: [columns.map(col => col.header)],
      body: rows.map(row => Object.values(row)),
      startY: 80,
    });

    // Add total earnings
    doc.text(`Total Earnings: $${sellerData.totalEarnings.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);

    // Save the PDF
    doc.save(`${sellerData.sellerName}_Invoice.pdf`);
  };




  const getAllSAeller = async () => {
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
      setSellersData(res.data.countSeller);
      setSellerss(res.data.sellers);
      console.log("All sellers:", res.data.countSeller);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/get-all-users`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
          },
        }
      );
      setUserCount(res.data.count);
      console.log("All users:", res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // const getOrder = async () => {
  //   setLoading(true); // Set loading to true when fetching starts
  //   try {
  //     const res = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/admin/get-orders`,
  //       {
  //         headers: {
  //          Authorization : `${token}`,
  //         },
  //       }
  //     );
  //     // calculate 10recent order
  //     if (res.data.status) {
  //       const sortedOrders = res.data.orders
  //         .filter((order) => order.paymentDetails.payment_status !== "failed")
  //         .slice(0, 10); // Get only the latest 10 orders

  //       setRecentOrders(sortedOrders);
  //     }

  //     console.log("res", res.data.orders);
  //     if (res.data.status) {
  //       // Calculate total earnings
  //       // Calculate total earnings
  //       const earnings = res.data.orders.reduce((total, order) => {
  //         // Check if productDetails exists and is an array
  //         if (Array.isArray(order.productDetails)) {
  //           return (
  //             total +
  //             order.productDetails.reduce((orderTotal, product) => {
  //               return orderTotal + product.price * product.quantity;
  //             }, 0)
  //           );
  //         }
  //         return total; // If no productDetails, return total unchanged
  //       }, 0);

  //       console.log("earnings", earnings);
  //       // Set total earnings in state
  //       setTotalEarning(earnings);
  //     }

  //     //
  //     const filteredOrders = res.data.orders.filter(
  //       (order) => order.paymentDetails.payment_status === "succeeded"
  //     );

  //     const earningsData = calculateMonthlyEarnings(filteredOrders);
  //     setMonthlyEarnings(earningsData.earnings);
  //     setLabels(earningsData.labels);
  //     setAllOrders(res.data.orders);

  //     setProductSales(filteredOrders);
  //   } catch (error) {
  //     console.log(error.message);
  //   } finally {
  //     setLoading(false); // Set loading to false when fetching completes
  //   }
  // };

  // const calculateMonthlyEarnings = (orders) => {
  //   const monthlyEarningsMap = {};

  //   orders.forEach((order) => {
  //     order.productDetails.forEach((product) => {
  //       const orderDate = new Date(order.createdAt);
  //       const month = orderDate.toLocaleString("default", {
  //         year: "numeric",
  //         month: "short",
  //       });

  //       const earning = product.price * product.quantity;

  //       if (monthlyEarningsMap[month]) {
  //         monthlyEarningsMap[month] += earning;
  //       } else {
  //         monthlyEarningsMap[month] = earning;
  //       }
  //     });
  //   });

  //   // Sort the earnings by date
  //   const sortedMonths = Object.keys(monthlyEarningsMap).sort(
  //     (a, b) => new Date(a) - new Date(b)
  //   );

  //   const sortedEarnings = sortedMonths.map(
  //     (month) => monthlyEarningsMap[month]
  //   );

  //   return {
  //     labels: sortedMonths, // X-axis labels (months)
  //     earnings: sortedEarnings, // Y-axis data (earnings)
  //   };
  // };


  const getOrder = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/get-orders`,
        {
          headers: { Authorization: `${token}` },
        }
      );

      

      if (res.data.status) {
        setOrders(res.data.orders);
        const { monthlyEarnings, individualEarnings } = processOrderData(res.data.orders);
        setEarningsData({ monthlyEarnings, individualEarnings });
        
        // Calculate total earnings
        const totalEarnings = res.data.orders.reduce((total, order) => {
          return total + order.productDetails.reduce((orderTotal, product) => {
            const commission = parseFloat(product.commission);
            return orderTotal + (isNaN(commission) ? 0 : commission);
          }, 0);
        }, 0);

        setAdminEarning(totalEarnings);

        // Extract unique sellers for the dropdown with their details
        const uniqueSellers = [];
        res.data.orders.forEach(order => {
          order.productDetails.forEach(product => {
            
            // const seller = {
            //   id: product?.sellerId?._id,
            //   name: product?.sellerId?.seller_name,
            // };

            const seller = {
              id:product.sellerId?._id || "unknown_id", // Use a default value if necessary
              name: product.sellerId?.seller_name || "Unknown Seller",
            };

            // Check if the seller is already in the uniqueSellers array
            if (!uniqueSellers.some(s => s.id === seller.id)) {
              uniqueSellers.push(seller);
            }
          });
        });

        console.log("Unique Sellers:", uniqueSellers); // Log for debugging
        setSellers(uniqueSellers);
      }

      // Calculate monthly earnings and commission for each seller
      setSellerOrders(res.data.orders);
      processSellerOrderData(res.data.orders);


    // Filter only orders with "Delivered" status
    const delivered = res.data.orders
    .flatMap(order => order.productDetails
      .filter(product => product.orderStatus === "Delivered")
      .map(product => ({
        ...product,
        orderId: order._id,
        userAddress: JSON.parse(order.user_address).address,
        totalAmount: order.totalAmount
      }))
    );

  setDeliveredOrders(delivered);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };


  const groupedOrders = deliveredOrders.reduce((acc, product) => {
    const sellerId = product.sellerId._id;
    if (!acc[sellerId]) {
      const seller = sellerss.find(s => s._id === sellerId) || {};
      acc[sellerId] = {
        sellerName: seller.seller_name,
        sellerEmail: seller.seller_email,
        bankName: seller.bank_name,
        ifscCode: seller.ifsc_code,
        accNo: seller.acc_no,
        bankHolderName: seller.bank_holder_name,
        products: [],
        totalEarnings: 0
      };
    }
    acc[sellerId].products.push(product);
    acc[sellerId].totalEarnings += product.earnings;
    return acc;
  }, {});

  console.log('groupedOrders:', groupedOrders)


  const processSellerOrderData = (orders) => {
    const sellersData = {};
    orders.forEach(order => {
      order.productDetails.forEach(product => {
        const sellerId = product.sellerId._id;
        const sellerName = product.sellerId.seller_name;
        const month = new Date(order.createdAt).getMonth();
  
        if (!sellersData[sellerId]) {
          // Ensure each month has its unique object
          sellersData[sellerId] = {
            sellerName,
            monthlyData: Array.from({ length: 12 }, () => ({ earnings: 0, commission: 0 }))
          };
        }
  
        sellersData[sellerId].monthlyData[month].earnings += product.earnings;
        sellersData[sellerId].monthlyData[month].commission += parseFloat(product.commission);
      });
    });
  
    setCSellersCheck(Object.keys(sellersData).map(id => ({ id, name: sellersData[id].sellerName })));
    setEarningsDatas(sellersData);
  };
  

  const handleSellerChange = (value) => {
    setSelectSeller(value);
  };

  const processOrderData = (orders) => {
    const monthlyEarnings = {};
    const individualEarnings = {};
    
    // Logic to calculate earnings
    orders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const monthYear = `${orderDate.getFullYear()}-${orderDate.getMonth() + 1}`;
      
      if (!monthlyEarnings[monthYear]) {
        monthlyEarnings[monthYear] = 0;
      }

      order.productDetails.forEach(product => {
        const earnings = parseFloat(product.commission);
        monthlyEarnings[monthYear] += earnings;

        const formattedDate = orderDate.toISOString().split('T')[0];
        if (!individualEarnings[formattedDate]) {
          individualEarnings[formattedDate] = 0;
        }
        individualEarnings[formattedDate] += earnings;
      });
    });

    return { monthlyEarnings, individualEarnings };
  };

  useEffect(() => {
    getOrder();
  }, [selectSeller]);

  const handleChange = (value) => {
    setFilterType(value);
  };


  useEffect(() => {
    // getOrder();
    getAllUsers();
    getAllSAeller();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="page-wrapper">
        <div className="page-content">
          <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
            <div className="col">
              <div className="card radius-10">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">Revenue</p>
                      <h4 className="my-1">{adminEarning}</h4>
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
            <div className="col">
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
            <div className="col">
              <div className="card radius-10">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">Total Seller</p>
                      <h4 className="my-1">{sellersData}</h4>
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
          <div className="row">
            <div className="col-lg-7">
              <div className="card radius-10" style={{ height: "58vh" }}>
                <div className="card-body my-2">
                  <h5 className="card-title px-4">Earnings Over Time</h5>
                  <div style={{ padding: '20px' }}>
                {loading ? (
                  <Spin />
                ) : (
                  <>
                    <Select defaultValue="monthly" style={{ width: 120, marginBottom: '20px' }} onChange={handleChange}>
                      <Option value="monthly">Monthly</Option>
                      <Option value="individual">Individual</Option>
                    </Select>
                    
                    <AdminLineChart earningsData={earningsData} filterType={filterType} />
                  </>
                )}
              </div>
                </div>
              </div>
            </div>

            <div className="col d-flex">
            <div className="card radius-10 w-100">
              <div className="card-header border-bottom-0 my-1">
                <div className="d-flex align-items-center ">
                  <h5 className="card-title mb-0 my-3">Seller Earnings and Commission</h5>
                </div>
              </div>
              <div style={{ padding: "20px" }}>
                {loading ? (
                  <Spin />
                ) : (
                  <>
                    <Select
                      placeholder="Select Seller"
                      style={{ width: 200, marginBottom: "20px" }}
                      onChange={handleSellerChange}
                    >
                      {sellersCheck.map((seller) => (
                        <Option key={seller.id} value={seller.id}>
                          {seller.name}
                        </Option>
                      ))}
                    </Select>
                    {selectSeller && (
                      <SellerEarningsAdmin className="my-2"
                        data={earningsDatas[selectSeller]?.monthlyData || []}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          </div>
          {/*end row*/}
          {/*end row*/}

          {/* <div className="card radius-10">
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
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Order id</th>
                      <th>Product</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#897656</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="recent-product-img">
                            <img
                              src="{{ url('assets/images/icons/chair.png') }}"
                              alt=""
                            />
                          </div>
                          <div className="ms-2">
                            <h6 className="mb-1 font-14">Light Blue Chair</h6>
                          </div>
                        </div>
                      </td>
                      <td>Brooklyn Zeo</td>
                      <td>12 Jul 2020</td>
                      <td>$64.00</td>
                      <td>
                        <div className="d-flex align-items-center text-danger">
                          {" "}
                          <i className="bx bx-radio-circle-marked bx-burst bx-rotate-90 align-middle font-18 me-1" />
                          <span>Pending</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex order-actions">
                          {" "}
                          <a href="javascript:;" className="">
                            <i className="bx bx-cog" />
                          </a>
                          <a href="javascript:;" className="ms-4">
                            <i className="bx bx-down-arrow-alt" />
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>#987549</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="recent-product-img">
                            <img
                              src="{{ url('assets/images/icons/shoes.png') }}"
                              alt=""
                            />
                          </div>
                          <div className="ms-2">
                            <h6 className="mb-1 font-14">Green Sport Shoes</h6>
                          </div>
                        </div>
                      </td>
                      <td>Martin Hughes</td>
                      <td>14 Jul 2020</td>
                      <td>$45.00</td>
                      <td>
                        <div className="d-flex align-items-center text-primary">
                          {" "}
                          <i className="bx bx-radio-circle-marked bx-burst bx-rotate-90 align-middle font-18 me-1" />
                          <span>Dispatched</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex order-actions">
                          {" "}
                          <a href="javascript:;" className="">
                            <i className="bx bx-cog" />
                          </a>
                          <a href="javascript:;" className="ms-4">
                            <i className="bx bx-down-arrow-alt" />
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>#685749</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="recent-product-img">
                            <img
                              src="{{ url('assets/images/icons/headphones.png') }}"
                              alt=""
                            />
                          </div>
                          <div className="ms-2">
                            <h6 className="mb-1 font-14">Red Headphone 07</h6>
                          </div>
                        </div>
                      </td>
                      <td>Shoan Stephen</td>
                      <td>15 Jul 2020</td>
                      <td>$67.00</td>
                      <td>
                        <div className="d-flex align-items-center text-success">
                          {" "}
                          <i className="bx bx-radio-circle-marked bx-burst bx-rotate-90 align-middle font-18 me-1" />
                          <span>Completed</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex order-actions">
                          {" "}
                          <a href="javascript:;" className="">
                            <i className="bx bx-cog" />
                          </a>
                          <a href="javascript:;" className="ms-4">
                            <i className="bx bx-down-arrow-alt" />
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>#887459</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="recent-product-img">
                            <img
                              src="{{ url('assets/images/icons/idea.png') }}"
                              alt=""
                            />
                          </div>
                          <div className="ms-2">
                            <h6 className="mb-1 font-14">Mini Laptop Device</h6>
                          </div>
                        </div>
                      </td>
                      <td>Alister Campel</td>
                      <td>18 Jul 2020</td>
                      <td>$87.00</td>
                      <td>
                        <div className="d-flex align-items-center text-success">
                          {" "}
                          <i className="bx bx-radio-circle-marked bx-burst bx-rotate-90 align-middle font-18 me-1" />
                          <span>Completed</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex order-actions">
                          {" "}
                          <a href="javascript:;" className="">
                            <i className="bx bx-cog" />
                          </a>
                          <a href="javascript:;" className="ms-4">
                            <i className="bx bx-down-arrow-alt" />
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>#335428</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="recent-product-img">
                            <img
                              src="{{ url('assets/images/icons/user-interface.png') }}"
                              alt=""
                            />
                          </div>
                          <div className="ms-2">
                            <h6 className="mb-1 font-14">
                              Purple Mobile Phone
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>Keate Medona</td>
                      <td>20 Jul 2020</td>
                      <td>$75.00</td>
                      <td>
                        <div className="d-flex align-items-center text-danger">
                          {" "}
                          <i className="bx bx-radio-circle-marked bx-burst bx-rotate-90 align-middle font-18 me-1" />
                          <span>Pending</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex order-actions">
                          {" "}
                          <a href="javascript:;" className="">
                            <i className="bx bx-cog" />
                          </a>
                          <a href="javascript:;" className="ms-4">
                            <i className="bx bx-down-arrow-alt" />
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>#224578</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="recent-product-img">
                            <img
                              src="{{ url('assets/images/icons/watch.png') }}"
                              alt=""
                            />
                          </div>
                          <div className="ms-2">
                            <h6 className="mb-1 font-14">Smart Hand Watch</h6>
                          </div>
                        </div>
                      </td>
                      <td>Winslet Maya</td>
                      <td>22 Jul 2020</td>
                      <td>$80.00</td>
                      <td>
                        <div className="d-flex align-items-center text-primary">
                          {" "}
                          <i className="bx bx-radio-circle-marked bx-burst bx-rotate-90 align-middle font-18 me-1" />
                          <span>Dispatched</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex order-actions">
                          {" "}
                          <a href="javascript:;" className="">
                            <i className="bx bx-cog" />
                          </a>
                          <a href="javascript:;" className="ms-4">
                            <i className="bx bx-down-arrow-alt" />
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>#447896</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="recent-product-img">
                            <img
                              src="{{ url('assets/images/icons/tshirt.png') }}"
                              alt=""
                            />
                          </div>
                          <div className="ms-2">
                            <h6 className="mb-1 font-14">T-Shirt Blue</h6>
                          </div>
                        </div>
                      </td>
                      <td>Emy Jackson</td>
                      <td>28 Jul 2020</td>
                      <td>$96.00</td>
                      <td>
                        <div className="d-flex align-items-center text-danger">
                          {" "}
                          <i className="bx bx-radio-circle-marked bx-burst bx-rotate-90 align-middle font-18 me-1" />
                          <span>Pending</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex order-actions">
                          {" "}
                          <a href="javascript:;" className="">
                            <i className="bx bx-cog" />
                          </a>
                          <a href="javascript:;" className="ms-4">
                            <i className="bx bx-down-arrow-alt" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div> */}

          <div className="card radius-10">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0">Delivered Orders</h5>
                    <div className="font-22 ms-auto">
                      <i className="bx bx-dots-horizontal-rounded" />
                    </div>
                  </div>
                  <hr />

                  <div>
                    {Object.values(groupedOrders).map((sellerData, index) => (
                      <div key={index} className="seller-section" style={{ marginBottom: "30px" }}>
                        {/* <h5>Seller Name:{sellerData.sellerName} Email: ({sellerData.sellerEmail})</h5> */}
                        <div className="d-flex align-items-center justify-content-between">

                          <div>
                          <h5>Seller Details:</h5>
                            <p><strong>Seller Name:</strong> {sellerData.sellerName}</p>
                            <p><strong>Seller Email:</strong> {sellerData.sellerEmail}</p>
                          </div>
                          <div>
                                <h5>Bank Details:</h5>
                              <p><strong>Bank Name:</strong> {sellerData.bankName}</p>

                              <p><strong>IFSC Code:</strong> {sellerData.ifscCode}</p>

                              <p><strong>Account Holder's Name:</strong> {sellerData.bankHolderName}</p>

                              <p><strong>Account No:</strong> {sellerData.accNo}</p>
                          </div>
                        </div>
                       
                     
                        
                        <Table
                          dataSource={sellerData.products}
                          pagination={false}
                          rowKey={(product) => product.productId}
                          columns={[
                            { title: "Product Name", dataIndex: "name", key: "name" },
                            { title: "Quantity", dataIndex: "quantity", key: "quantity" },
                            { title: "Price", dataIndex: "price", key: "price" },
                            { title: "Earnings", dataIndex: "earnings", key: "earnings" },
                            { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount" },
                            {
                              title: "Shipping Address",
                              key: "userAddress",
                              render: (text, product) => (
                                <span>
                                  {product.userAddress.full_name}, {product.userAddress.address}
                                </span>
                              )
                            }
                          ]}
                          summary={() => (

                            <Table.Summary.Row>
                              <Table.Summary.Cell colSpan={3} align="right">
                                <strong>Total Earnings:</strong>
                              </Table.Summary.Cell>
                              <Table.Summary.Cell align="right">
                                <strong>${sellerData.totalEarnings.toFixed(2)}</strong>
                              </Table.Summary.Cell>
                              <Table.Summary.Cell colSpan={2}>
                                <Button
                                  type="primary"
                                  onClick={() => handleDownloadInvoice(sellerData)}
                                >
                                  Download Invoice
                                </Button>
                              </Table.Summary.Cell>
                            </Table.Summary.Row>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>




        </div>
      </div>
      <AdminFooter />
    </>
  );
};

const SellerEarningsAdmin = ({ data }) => {
  const labels = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Earnings",
        data: data.map(month => month.earnings),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Commission",
        data: data.map(month => month.commission),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (in currency)"
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};


export default AdminDashboard;
