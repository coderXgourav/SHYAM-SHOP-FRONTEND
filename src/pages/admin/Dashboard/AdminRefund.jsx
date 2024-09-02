import React, { useState, useEffect } from "react";
import Quill from "quill";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminFooter from "../../../components/admin/AdminFooter";


const AdminRefund = () => {
  const [refundID, setRefundID] = useState("");
  const [orderID, setOrderID] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");

  const [sellerRemarks, setSellerRemarks] = useState("");

  const [refundStatus, setRefundStatus] = useState("");
  const [notes, setNotes] = useState("");

  const refundHandler = async (event) => {
    event.preventDefault();
    if (!refundID || !orderID || !refundAmount || !refundReason) {
      // Handle validation error
    } else {
      // Handle refund logic here
    }
  };

  useEffect(() => {
    new Quill("#notes-editor", {
      theme: "snow",
    });
  }, []);

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
                    <a href="javascript:;">
                      <i className="bx bx-home-alt" />
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Refund Management
                  </li>
                </ol>
              </nav>
            </div>
            <div className="ms-auto">
              <div className="btn-group">
                <a href="{{route('admin.viewRefunds')}}">
                  <button type="button" className="btn-sm btn btn-primary">
                    View Refunds
                  </button>
                </a>
              </div>
            </div>
          </div>

          <form id="formSubmit" onSubmit={refundHandler}>
            <input type="hidden" id="url" defaultValue="/admin/refund-management" />
            <input type="hidden" id="dataType" defaultValue="POST" />
            <div className="card">
              <div className="card-body p-4">
                <h5 className="card-title">Manage Refund</h5>
                <hr />
                <div className="form-body mt-4">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="border border-3 p-4 rounded">
                        <div className="mb-3">
                          <label htmlFor="refundID" className="form-label">
                            Refund ID
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="refundID"
                            placeholder="Enter refund ID"
                            name="refundID"
                            required
                            onChange={(e) => setRefundID(e.target.value)}
                            value={refundID}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="orderID" className="form-label">
                            Order ID
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="orderID"
                            placeholder="Enter order ID"
                            name="orderID"
                            required
                            onChange={(e) => setOrderID(e.target.value)}
                            value={orderID}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="refundAmount" className="form-label">
                            Refund Amount
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="refundAmount"
                            placeholder="Enter refund amount"
                            name="refundAmount"
                            required
                            onChange={(e) => setRefundAmount(e.target.value)}
                            value={refundAmount}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="refundReason" className="form-label">
                            Refund Reason
                          </label>
                          <textarea
                            className="form-control"
                            id="refundReason"
                            placeholder="Enter reason for refund"
                            name="refundReason"
                            required
                            onChange={(e) => setRefundReason(e.target.value)}
                            value={refundReason}
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="refundReason" className="form-label">
                            Seller Remarks
                          </label>
                          <textarea
                            className="form-control"
                            id="seller-remarks"
                            placeholder="Seller Remark"
                            name="sellerremark"
                            required
                            onChange={(e) => setRefundReason(e.target.value)}
                            value={refundReason}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="border border-3 p-4 rounded">
                        <div className="mb-3">
                          <label htmlFor="refundStatus" className="form-label">
                            Refund Status
                          </label>
                          <select
                            className="form-select"
                            id="refundStatus"
                            name="refundStatus"
                            onChange={(e) => setRefundStatus(e.target.value)}
                            value={refundStatus}
                            required
                          >
                            <option value="">Select Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Processed">Processed</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="notes" className="form-label">
                            Notes
                          </label>
                          <div>
                            <div
                              id="notes-editor"
                              style={{ height: "200px" }}
                            ></div>
                          </div>
                        </div>
                        <div className="d-grid mt-3">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            id="submitBtn"
                          >
                            Save Refund
                          </button>
                          <button
                            className="btn btn-primary"
                            type="button"
                            disabled
                            id="loadingBtn"
                            style={{ display: "none", width: "100%" }}
                          >
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            />
                            <span className="visually-hidden">Loading...</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*end row*/}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminRefund;
