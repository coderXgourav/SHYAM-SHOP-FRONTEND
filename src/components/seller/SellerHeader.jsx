import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const SellerHeader = () => {
  const loginToken = localStorage.getItem("sellerToken");
  const decoded = loginToken && jwtDecode(loginToken);
  // console.log('decoded', decoded.sellerToken.seller_name)
  useEffect(() => {
    if (!decoded) {
      window.location = "/seller/login";
    }
  }, [0]);

  const sellerLogout = () => {
    localStorage.removeItem("sellerToken");
    window.location = "/seller/login";
  };
  return (
    <>
      <div class="wrapper">
        <>
          <div className="sidebar-wrapper" data-simplebar="true">
            <div className="sidebar-header">
              <div>
                <img
                  src="/logo.png"
                  className="logo-icon"
                  alt="logo icon"
                  style={{ width: "65%" }}
                />
              </div>
              <div className="toggle-icon ms-auto">
                <i className="bx bx-arrow-back" />
              </div>
            </div>
            {/*navigation*/}
            <ul className="metismenu" id="menu">
              <li>
                <a href="/seller/dashboard" className="">
                  <div className="parent-icon">
                    <i className="bx bx-home-alt" />
                  </div>
                  <div className="menu-title">Dashboard</div>
                </a>
              </li>
              <li>
                <a href="javascript:;" className="has-arrow">
                  <div className="parent-icon">
                    <i className="bx bx-category" />
                  </div>
                  <div className="menu-title">Category </div>
                </a>
                <ul>
                  <li>
                    {" "}
                    <a href="/seller/request-category">
                      <i className="bx bx-radio-circle" />
                      Request Add Category
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a href="/seller/view-category">
                      <i className="bx bx-radio-circle" />
                      Request Categories
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="javascript:;" className="has-arrow">
                  <div className="parent-icon">
                    <i className="bx bx-category" />
                  </div>
                  <div className="menu-title">Product Management </div>
                </a>
                <ul>
                  <li>
                    {" "}
                    <a href="/add-product">
                      <i className="bx bx-radio-circle" />
                      Add Product
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a href="/view-products">
                      <i className="bx bx-radio-circle" />
                      View Product
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a className="has-arrow" href="javascript:;">
                  <div className="parent-icon">
                    <i className="bx bx-cart" />
                  </div>
                  <div className="menu-title">Order Management</div>
                </a>
                <ul>
                  <li>
                    {" "}
                    <a href="/manage-orders">
                      <i className="bx bx-radio-circle" />
                      Manage Orders
                    </a>
                  </li>
                  {/* <li>
                    {" "}
                    <a href="#">
                      <i className="bx bx-radio-circle" />
                      Typography
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a href="#">
                      <i className="bx bx-radio-circle" />
                      Text Utilities
                    </a>
                  </li> */}
                </ul>
              </li>
              <li>
                <a className="has-arrow" href="javascript:;">
                  <div className="parent-icon">
                    <i className="bx bx-dollar-circle" />
                  </div>
                  <div className="menu-title">Payments</div>
                </a>
                <ul>
                  <li>
                    {" "}
                    <a href="#">
                      <i className="bx bx-radio-circle" />
                      Grid System
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a href="#">
                      <i className="bx bx-radio-circle" />
                      Typography
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a href="#">
                      <i className="bx bx-radio-circle" />
                      Text Utilities
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a className="has-arrow" href="javascript:;">
                  <div className="parent-icon">
                    <i className="bx bx-lock" />
                  </div>
                  <div className="menu-title">Authentication</div>
                </a>
                <ul>
                  <li>
                    <a href="/seller/change-credential">
                      <i className="bx bx-radio-circle" />
                      Change credintials
                    </a>
                  </li>
                  <li>
                    <a onClick={sellerLogout} href="#">
                      <i className="bx bx-radio-circle" />
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            {/*end navigation*/}
          </div>
          <header>
            <div className="topbar d-flex align-items-center">
              <nav className="navbar navbar-expand gap-3">
                <div className="mobile-toggle-menu">
                  <i className="bx bx-menu" />
                </div>
                <div
                  className="position-relative search-bar d-lg-block d-none"
                  data-bs-toggle="modal"
                  data-bs-target="#SearchModal"
                ></div>
                <div className="top-menu ms-auto">
                  <ul className="navbar-nav align-items-center gap-1">
                    <li
                      className="nav-item mobile-search-icon d-flex d-lg-none d-none"
                      data-bs-toggle="modal"
                      data-bs-target="#SearchModal"
                    >
                      <a className="nav-link" href="avascript:;">
                        <i className="bx bx-search" />
                      </a>
                    </li>

                    <li className="nav-item dark-mode d-none d-sm-flex ">
                      <a
                        className="nav-link dark-mode-icon"
                        href="javascript:;"
                      >
                        <i className="bx bx-moon" />
                      </a>
                    </li>
                    <li className="nav-item dropdown dropdown-app d-none">
                      <a
                        className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                        data-bs-toggle="dropdown"
                        href="javascript:;"
                      >
                        <i className="bx bx-grid-alt" />
                      </a>
                      <div className="dropdown-menu dropdown-menu-end p-0">
                        <div className="app-container p-2 my-2">
                          <div className="row gx-0 gy-2 row-cols-3 justify-content-center p-2"></div>
                        </div>
                      </div>
                    </li>
                    <li className="nav-item dropdown dropdown-large d-none">
                      <a
                        className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        <span className="alert-count">7</span>
                        <i className="bx bx-bell" />
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a href="javascript:;">
                          <div className="msg-header">
                            <p className="msg-header-title">Notifications</p>
                            <p className="msg-header-badge">8 New</p>
                          </div>
                        </a>
                        <div className="header-notifications-list"></div>
                        <a href="javascript:;">
                          <div className="text-center msg-footer">
                            <button className="btn btn-primary w-100">
                              View All Notifications
                            </button>
                          </div>
                        </a>
                      </div>
                    </li>
                    <li className="nav-item dropdown dropdown-large d-none">
                      <a
                        className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="alert-count">8</span>
                        <i className="bx bx-shopping-bag" />
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a href="javascript:;">
                          <div className="msg-header">
                            <p className="msg-header-title">My Cart</p>
                            <p className="msg-header-badge">10 Items</p>
                          </div>
                        </a>
                        <div className="header-message-list"></div>
                        <a href="javascript:;">
                          <div className="text-center msg-footer">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                              <h5 className="mb-0">Total</h5>
                              <h5 className="mb-0 ms-auto">$489.00</h5>
                            </div>
                            <button className="btn btn-primary w-100">
                              Checkout
                            </button>
                          </div>
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="user-box dropdown px-3">
                  <a
                    className="d-flex align-items-center nav-link dropdown-toggle gap-3 dropdown-toggle-nocaret"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="/assets/images/avatars/avatar-2.png"
                      className="user-img"
                      alt="user avatar"
                    />
                    <div className="user-info">
                      <p className="user-name mb-0">{decoded?.sellerToken?.seller_name}</p>
                      <p className="designattion mb-0">Seller Portal</p>
                    </div>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="javascript:;"
                      >
                        <i className="bx bx-user fs-5" />
                        <span>Profile</span>
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="javascript:;"
                      >
                        <i className="bx bx-cog fs-5" />
                        <span>Settings</span>
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="javascript:;"
                      >
                        <i className="bx bx-home-circle fs-5" />
                        <span>Dashboard</span>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider mb-0" />
                    </li>
                    <li>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                        onClick={sellerLogout}
                      >
                        <i className="bx bx-log-out-circle" />
                        <span>Logout</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </header>
        </>
      </div>
    </>
  );
};

export default SellerHeader;
