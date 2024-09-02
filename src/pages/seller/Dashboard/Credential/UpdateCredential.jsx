import SellerFooter from "../../../../components/seller/SellerFooter";
import SellerHeader from "../../../../components/seller/SellerHeader";
import { useState, useEffect } from "react";
import {
  credentialUpdate,
  credentialDetails,
} from "../../../../utils/seller/sellerAPI";
import { toast, ToastContainer } from "react-toastify";

const UpdateCredential = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [btnStatus, setBtnStatus] = useState(false);

  useEffect(async () => {
    const sellerDetails = await credentialDetails();
    setUsername(sellerDetails?.username);
    setEmail(sellerDetails?.seller_email);
    setPassword(sellerDetails?.seller_password);
  }, [0]);

  const updateCredentialSubmit = async (event) => {
    event.preventDefault();
    setBtnStatus(true);

    if (!username || !email || !password) {
      setBtnStatus(false);
      return toast["error"]("Please Fill input Fields");
    }

    const data = { username, email, password };
    const result = await credentialUpdate(data);
    setBtnStatus(false);
    toast[result.icon](result.title);
    if (result.status) {
      setUsername("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <SellerHeader />

      <div className="page-wrapper">
        <div className="page-content">
          {/*breadcrumb*/}
          <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div className="breadcrumb-title pe-3"></div>
            <div className="ps-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="javascript:;">
                      <i className="bx bx-home-alt" />
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Update Credential
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          {/*end breadcrumb*/}
          <div className="row">
            <div className="col-xl-9 mx-auto">
              <form onSubmit={updateCredentialSubmit}>
                <input
                  type="hidden"
                  id="url"
                  defaultValue="/seller/add-category"
                />
                <input type="hidden" id="dataType" defaultValue="POST" />
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="LcoydqmIVeeSsJm2SfgstfFVDOZO97lrPPt02Efn"
                />
                <div className="card">
                  <div className="card-header">
                    <h4 className="my-4 text-center text-primary">
                      Update Credential
                    </h4>
                  </div>
                  <div className="card-body">
                    <br />
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Type new username"
                      required=""
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      value={username}
                    />

                    <br />
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Type new email"
                      required=""
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      value={email}
                    />
                    <br />
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Type new password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required=""
                      value={password}
                    />
                  </div>
                  <br />
                  <div className="card-footer text-center">
                    {" "}
                    <br />
                    <input
                      type="submit"
                      id="submitBtn"
                      defaultValue="Add Category"
                      className="btn btn-primary "
                      value={"Update Credential"}
                      disabled={btnStatus}
                    />
                    <button
                      className="btn btn-primary"
                      type="button"
                      disabled=""
                      id="loadingBtn"
                      style={{ display: "none", width: 136 }}
                    >
                      {" "}
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Loading...</span>
                    </button>
                  </div>
                  <br />
                </div>
              </form>
              <ToastContainer />
            </div>
          </div>
          {/*end row*/}
        </div>
      </div>
      <SellerFooter />
    </>
  );
};

export default UpdateCredential;
