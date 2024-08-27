import React from "react";
import SellerHeader from "../../../components/seller/SellerHeader";
import SellerFooter from "../../../components/seller/SellerFooter";

const Dashboard = () => {
  return (
    <>
      <SellerHeader />
      <div className="page-wrapper">
        <div className="page-content">
          <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
            <div className="col">
              <div className="card radius-10">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">Revenue</p>
                      <h4 className="my-1">$4805</h4>
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
                      <h4 className="my-1">8.4K</h4>
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
                      <p className="mb-0 text-secondary">Store Visitors</p>
                      <h4 className="my-1">59K</h4>
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
          <div className="row row-cols-1 row-cols-xl-2">
            <div className="col d-flex">
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
            <div className="col d-flex">
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
                <div className="product-list p-3 mb-3">
                  <div className="row border mx-0 mb-3 py-2 radius-10 cursor-pointer">
                    <div className="col-sm-6">
                      <div className="d-flex align-items-center">
                        <div className="product-img">
                          <img
                            src="{{ url('assets/images/icons/chair.png') }}"
                            alt=""
                          />
                        </div>
                        <div className="ms-2">
                          <h6 className="mb-1">Light Blue Chair</h6>
                          <p className="mb-0">$240.00</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm">
                      <h6 className="mb-1">$2140.00</h6>
                      <p className="mb-0">345 Sales</p>
                    </div>
                    <div className="col-sm">
                      <div id="chart5" />
                    </div>
                  </div>
                  <div className="row border mx-0 mb-3 py-2 radius-10 cursor-pointer">
                    <div className="col-sm-6">
                      <div className="d-flex align-items-center">
                        <div className="product-img">
                          <img
                            src="{{ url('assets/images/icons/user-interface.png') }}"
                            alt=""
                          />
                        </div>
                        <div className="ms-2">
                          <h6 className="mb-1">Honor Mobile 7x</h6>
                          <p className="mb-0">$159.00</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm">
                      <h6 className="mb-1">$3570.00</h6>
                      <p className="mb-0">148 Sales</p>
                    </div>
                    <div className="col-sm">
                      <div id="chart6" />
                    </div>
                  </div>
                  <div className="row border mx-0 mb-3 py-2 radius-10 cursor-pointer">
                    <div className="col-sm-6">
                      <div className="d-flex align-items-center">
                        <div className="product-img">
                          <img
                            src="{{ url('assets/images/icons/watch.png') }}"
                            alt=""
                          />
                        </div>
                        <div className="ms-2">
                          <h6 className="mb-1">Hand Watch</h6>
                          <p className="mb-0">$250.00</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm">
                      <h6 className="mb-1">$3650.00</h6>
                      <p className="mb-0">122 Sales</p>
                    </div>
                    <div className="col-sm">
                      <div id="chart7" />
                    </div>
                  </div>
                  <div className="row border mx-0 mb-3 py-2 radius-10 cursor-pointer">
                    <div className="col-sm-6">
                      <div className="d-flex align-items-center">
                        <div className="product-img">
                          <img
                            src="{{ url('assets/images/icons/idea.png') }}"
                            alt=""
                          />
                        </div>
                        <div className="ms-2">
                          <h6 className="mb-1">Mini Laptop</h6>
                          <p className="mb-0">$260.00</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm">
                      <h6 className="mb-1">$6320.00</h6>
                      <p className="mb-0">452 Sales</p>
                    </div>
                    <div className="col-sm">
                      <div id="chart8" />
                    </div>
                  </div>
                  <div className="row border mx-0 mb-3 py-2 radius-10 cursor-pointer">
                    <div className="col-sm-6">
                      <div className="d-flex align-items-center">
                        <div className="product-img">
                          <img
                            src="{{ url('assets/images/icons/tshirt.png') }}"
                            alt=""
                          />
                        </div>
                        <div className="ms-2">
                          <h6 className="mb-1">Slim-T-Shirt</h6>
                          <p className="mb-0">$112.00</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm">
                      <h6 className="mb-1">$2360.00</h6>
                      <p className="mb-0">572 Sales</p>
                    </div>
                    <div className="col-sm">
                      <div id="chart9" />
                    </div>
                  </div>
                  <div className="row border mx-0 mb-3 py-2 radius-10 cursor-pointer">
                    <div className="col-sm-6">
                      <div className="d-flex align-items-center">
                        <div className="product-img">
                          <img
                            src="{{ url('assets/images/icons/headphones.png') }}"
                            alt=""
                          />
                        </div>
                        <div className="ms-2">
                          <h6 className="mb-1">Smart Headphones</h6>
                          <p className="mb-0">$360.00</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm">
                      <h6 className="mb-1">$9840.00</h6>
                      <p className="mb-0">275 Sales</p>
                    </div>
                    <div className="col-sm">
                      <div id="chart10" />
                    </div>
                  </div>
                  <div className="row border mx-0 py-2 radius-10 cursor-pointer">
                    <div className="col-sm-6">
                      <div className="d-flex align-items-center">
                        <div className="product-img">
                          <img
                            src="{{ url('assets/images/icons/shoes.png') }}"
                            alt=""
                          />
                        </div>
                        <div className="ms-2">
                          <h6 className="mb-1">Green Sports Shoes</h6>
                          <p className="mb-0">$410.00</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm">
                      <h6 className="mb-1">$3840.00</h6>
                      <p className="mb-0">265 Sales</p>
                    </div>
                    <div className="col-sm">
                      <div id="chart11" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*end row*/}
          {/*end row*/}
          <div className="card radius-10">
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
          </div>
        </div>
      </div>
      <SellerFooter />
    </>
  );
};

export default Dashboard;
