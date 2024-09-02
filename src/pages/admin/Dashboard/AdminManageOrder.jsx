import AdminFooter from "../../../components/admin/AdminFooter";
import AdminHeader from "../../../components/admin/AdminHeader";

const AdminManageOrder = () => {
  return (
    <>
      <AdminHeader />
      <div className="page-wrapper">
        <div className="page-content">
          {/*breadcrumb*/}
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
                    Manage Orders
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          {/*end breadcrumb*/}
          <div className="card">
            <div className="card-body">
              <div className="d-lg-flex align-items-center mb-4 gap-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control ps-5 radius-30"
                    placeholder="Search orders"
                  />
                  <span className="position-absolute top-50 product-show translate-middle-y">
                    <i className="bx bx-search" />
                  </span>
                </div>
                <div className="ms-auto">
                  <a href="#" className="btn btn-sm btn-primary mt-2 mt-lg-0">
                    <i className="bx bxs-plus-square" />
                    Add New Order
                  </a>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Order#</th>
                      <th>Company Name</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th>Date</th>
                      <th>View Details</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div>
                            <input
                              className="form-check-input me-3"
                              type="checkbox"
                              value=""
                              aria-label="..."
                            />
                          </div>
                          <div className="ms-2">
                            <h6 className="mb-0 font-14">#OS-000354</h6>
                          </div>
                        </div>
                      </td>
                      <td>Gaspur Antunes</td>
                      <td>
                        <div className="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3">
                          <i className="bx bxs-circle me-1"></i>Fulfilled
                        </div>
                      </td>
                      <td>$485.20</td>
                      <td>June 10, 2020</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm radius-30 px-4"
                        >
                          View Details
                        </button>
                      </td>
                      <td>
                        <div className="d-flex order-actions">
                          <a href="javascript:void(0);" className="">
                            <i className="bx bxs-edit"></i>
                          </a>
                          <a
                            href="javascript:void(0);"
                            className="ms-3"
                          >
                            <i className="bx bxs-trash"></i>
                          </a>
                        </div>
                      </td>
                    </tr>


                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div>
                            <input
                              className="form-check-input me-3"
                              type="checkbox"
                              value=""
                              aria-label="..."
                            />
                          </div>
                          <div className="ms-2">
                            <h6 className="mb-0 font-14">#OS-000354</h6>
                          </div>
                        </div>
                      </td>
                      <td>Gaspur Antunes</td>
                      <td>
                        <div className="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3">
                          <i className="bx bxs-circle me-1"></i>Fulfilled
                        </div>
                      </td>
                      <td>$485.20</td>
                      <td>June 10, 2020</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm radius-30 px-4"
                        >
                          View Details
                        </button>
                      </td>
                      <td>
                        <div className="d-flex order-actions">
                          <a href="javascript:void(0);" className="">
                            <i className="bx bxs-edit"></i>
                          </a>
                          <a
                            href="javascript:void(0);"
                            className="ms-3"
                          >
                            <i className="bx bxs-trash"></i>
                          </a>
                        </div>
                      </td>
                    </tr>



                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div>
                            <input
                              className="form-check-input me-3"
                              type="checkbox"
                              value=""
                              aria-label="..."
                            />
                          </div>
                          <div className="ms-2">
                            <h6 className="mb-0 font-14">#OS-000354</h6>
                          </div>
                        </div>
                      </td>
                      <td>Gaspur Antunes</td>
                      <td>
                        <div className="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3">
                          <i className="bx bxs-circle me-1"></i>Fulfilled
                        </div>
                      </td>
                      <td>$485.20</td>
                      <td>June 10, 2020</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm radius-30 px-4"
                        >
                          View Details
                        </button>
                      </td>
                      <td>
                        <div className="d-flex order-actions">
                          <a href="javascript:void(0);" className="">
                            <i className="bx bxs-edit"></i>
                          </a>
                          <a
                            href="javascript:void(0);"
                            className="ms-3"
                          >
                            <i className="bx bxs-trash"></i>
                          </a>
                        </div>
                      </td>
                    </tr>



                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div>
                            <input
                              className="form-check-input me-3"
                              type="checkbox"
                              value=""
                              aria-label="..."
                            />
                          </div>
                          <div className="ms-2">
                            <h6 className="mb-0 font-14">#OS-000354</h6>
                          </div>
                        </div>
                      </td>
                      <td>Gaspur Antunes</td>
                      <td>
                        <div className="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3">
                          <i className="bx bxs-circle me-1"></i>Fulfilled
                        </div>
                      </td>
                      <td>$485.20</td>
                      <td>June 10, 2020</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm radius-30 px-4"
                        >
                          View Details
                        </button>
                      </td>
                      <td>
                        <div className="d-flex order-actions">
                          <a href="javascript:void(0);" className="">
                            <i className="bx bxs-edit"></i>
                          </a>
                          <a
                            href="javascript:void(0);"
                            className="ms-3"
                          >
                            <i className="bx bxs-trash"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                    {/* Repeat the similar structure for other rows */}
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div>
                            <input
                              className="form-check-input me-3"
                              type="checkbox"
                              value=""
                              aria-label="..."
                            />
                          </div>
                          <div className="ms-2">
                            <h6 className="mb-0 font-14">#OS-000986</h6>
                          </div>
                        </div>
                      </td>
                      <td>Gaspur Antunes</td>
                      <td>
                        <div className="badge rounded-pill text-info bg-light-info p-2 text-uppercase px-3">
                          <i className="bx bxs-circle align-middle me-1"></i>
                          Confirmed
                        </div>
                      </td>
                      <td>$650.30</td>
                      <td>June 12, 2020</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm radius-30 px-4"
                        >
                          View Details
                        </button>
                      </td>
                      <td>
                        <div className="d-flex order-actions">
                          <a href="javascript:void(0);" className="">
                            <i className="bx bxs-edit"></i>
                          </a>
                          <a
                            href="javascript:void(0);"
                            className="ms-3"
                          >
                            <i className="bx bxs-trash"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div>
                            <input
                              className="form-check-input me-3"
                              type="checkbox"
                              value=""
                              aria-label="..."
                            />
                          </div>
                          <div className="ms-2">
                            <h6 className="mb-0 font-14">#OS-000536</h6>
                          </div>
                        </div>
                      </td>
                      <td>Gaspur Antunes</td>
                      <td>
                        <div className="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3">
                          <i className="bx bxs-circle align-middle me-1"></i>
                          Partially Shipped
                        </div>
                      </td>
                      <td>$159.45</td>
                      <td>June 14, 2020</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm radius-30 px-4"
                        >
                          View Details
                        </button>
                      </td>
                      <td>
                        <div className="d-flex order-actions">
                          <a href="javascript:void(0);" className="">
                            <i className="bx bxs-edit"></i>
                          </a>
                          <a
                            href="javascript:void(0);"
                            className="ms-3"
                          >
                            <i className="bx bxs-trash"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                    {/* Add more rows as needed */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminManageOrder;