import { useState } from "react";
import "./style.css";
import { SellerSignup } from "../../utils/seller/sellerAPI";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [btnStatus, setBtnStatus] = useState(false);
  const isLogin = localStorage.getItem("sellerToken");
  if (isLogin) {
    window.location = "/seller/dashboard";
  }
  const [sellerName, setSellerName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rName, setRname] = useState(false);
  const [rUsername, setRusername] = useState(false);
  const [rEmail, setRemail] = useState(false);
  const [rPassword, setRpassword] = useState(false);

  const signupFormHandler = async (event) => {
    event.preventDefault();
    setBtnStatus(true);

    if (sellerName.length > 0) {
      setRname(false);
    } else {
      setRname(true);
    }

    if (username.length > 0) {
      setRusername(false);
    } else {
      setRusername(true);
    }

    if (email.length > 0) {
      setRemail(false);
    } else {
      setRemail(true);
    }

    if (password.length > 0) {
      setRpassword(false);
    } else {
      setRpassword(true);
    }
    if (!username || !sellerName || !email || !password) {
      setBtnStatus(false);
    } else {
      const sellerData = { sellerName, username, email, password };
      const result = await SellerSignup(sellerData);
      setBtnStatus(false);
      toast[result.icon](result.title);
      if (result.status === true) {
        setSellerName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          window.location = "/seller/dashboard";
        }, 2000);
      }
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="section-authentication-cover">
          <div className="">
            <div className="row g-0">
              <div className="col-12 col-xl-7 col-xxl-8 auth-cover-left align-items-center justify-content-center d-none d-xl-flex">
                <div className="card shadow-none bg-transparent shadow-none rounded-0 mb-0">
                  <div className="card-body">
                    <img
                      src="/assets/images/login-images/register-cover.svg"
                      className="img-fluid auth-img-cover-login"
                      width={550}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-5 col-xxl-4 auth-cover-right align-items-center justify-content-center">
                <div className="card rounded-0 m-3 shadow-none bg-transparent mb-0">
                  <div className="card-body p-sm-5">
                    <div className="">
                      <div className="mb-3 text-center">
                        <img src="/logo.png" width="150px" alt="" />
                      </div>
                      <hr />
                      <div className="text-center mb-4">
                        <h5 className=""> Sign up</h5>
                        <p className="mb-0">
                          Please fill the below details to create your account
                        </p>
                      </div>
                      <div className="form-body">
                        <form className="row g-3" onSubmit={signupFormHandler}>
                          <div className="col-12">
                            <label
                              htmlFor="inputUsername"
                              className="form-label"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputUsername"
                              placeholder="Enter your Good Name"
                              required=""
                              onChange={(e) => {
                                setSellerName(e.target.value);
                              }}
                              value={sellerName}
                            />
                            {rName ? (
                              <label className="errors">
                                Please Fill the Name Field
                              </label>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-12">
                            <label
                              htmlFor="inputUsername"
                              className="form-label"
                            >
                              Username
                            </label>

                            <input
                              type="text"
                              className="form-control"
                              id="inputUsername"
                              placeholder="Jhon"
                              required=""
                              value={username}
                              onChange={(e) => {
                                setUsername(e.target.value);
                              }}
                            />
                            {rUsername ? (
                              <label className="errors">
                                Username Required
                              </label>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-12">
                            <label
                              htmlFor="inputEmailAddress"
                              className="form-label"
                            >
                              Email Address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="inputEmailAddress"
                              placeholder="example@user.com"
                              required=""
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                            />
                            {rEmail ? (
                              <label className="errors">
                                Please type your Email
                              </label>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-12">
                            <label
                              htmlFor="inputChoosePassword"
                              className="form-label"
                            >
                              Password
                            </label>
                            <div
                              className="input-group"
                              id="show_hide_password"
                            >
                              <input
                                type="password"
                                className="form-control border-end-0"
                                id="inputChoosePassword"
                                defaultValue=""
                                placeholder="Enter Password"
                                name="password"
                                required=""
                                minLength={4}
                                maxLength={30}
                                value={password}
                                onChange={(e) => {
                                  setPassword(e.target.value);
                                }}
                              />

                              <a
                                href="javascript:;"
                                className="input-group-text bg-transparent"
                              >
                                <i className="bx bx-hide" />
                              </a>
                            </div>
                            {rPassword ? (
                              <label className="errors">
                                Choose a Password
                              </label>
                            ) : (
                              ""
                            )}
                          </div>
                          {/* <div className="col-12">
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckChecked"
                                required
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexSwitchCheckChecked"
                              >
                                I read and agree to Terms &amp; Conditions
                              </label>
                            </div>
                          </div> */}{" "}
                          <br />
                          <div className="col-12">
                            <div className="d-grid">
                              <button
                                type="submit"
                                className="btn btn-primary"
                                id="submitBtn"
                                disabled={btnStatus}
                              >
                                Sign up
                              </button>
                              <button
                                className="btn btn-primary"
                                type="button"
                                disabled=""
                                id="loadingBtn"
                                style={{ display: "none" }}
                              >
                                {" "}
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </button>
                            </div>
                          </div>
                          <ToastContainer />
                          <div className="col-12">
                            <div className="text-center ">
                              <p className="mb-0">
                                Already have an account?{" "}
                                <a href="/seller/login">Sign in here</a>
                              </p>
                            </div>
                          </div>
                        </form>
                      </div>
                      {/* <div className="login-separater text-center mb-5">
                        <span>OR SIGN UP WITH EMAIL</span>
                        <hr />
                      </div>
                      <div className="list-inline contacts-social text-center">
                        <a
                          href="javascript:;"
                          className="list-inline-item bg-facebook text-white border-0 rounded-3"
                        >
                          <i className="bx bxl-facebook" />
                        </a>
                        <a
                          href="javascript:;"
                          className="list-inline-item bg-twitter text-white border-0 rounded-3"
                        >
                          <i className="bx bxl-twitter" />
                        </a>
                        <a
                          href="javascript:;"
                          className="list-inline-item bg-google text-white border-0 rounded-3"
                        >
                          <i className="bx bxl-google" />
                        </a>
                        <a
                          href="javascript:;"
                          className="list-inline-item bg-linkedin text-white border-0 rounded-3"
                        >
                          <i className="bx bxl-linkedin" />
                        </a>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end row*/}
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
