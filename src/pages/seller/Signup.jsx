import { useState } from "react";
import "./style.css";
import { SellerSignup } from "../../utils/seller/sellerAPI";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

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

  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankHolderName, setBankHolderName] = useState("");

  const [rName, setRname] = useState(false);
  const [rUsername, setRusername] = useState(false);
  const [rEmail, setRemail] = useState(false);
  const [rPassword, setRpassword] = useState(false);

  const [rBank, setRBank] = useState(false);

  
  // const signupFormHandler = async (event) => {
  //   event.preventDefault();
  //   setBtnStatus(true);
  
  //   // Form validation
  //   const isFormValid = () => {
  //     let valid = true;
      
  //     if (sellerName.length === 0) {
  //       setRname(true);
  //       valid = false;
  //     } else {
  //       setRname(false);
  //     }
  
  //     if (username.length === 0) {
  //       setRusername(true);
  //       valid = false;
  //     } else {
  //       setRusername(false);
  //     }
  
  //     if (email.length === 0) {
  //       setRemail(true);
  //       valid = false;
  //     } else {
  //       setRemail(false);
  //     }
  
  //     if (password.length === 0) {
  //       setRpassword(true);
  //       valid = false;
  //     } else {
  //       setRpassword(false);
  //     }
  
  //     return valid;
  //   };
  
  //   // Validate the form
  //   if (!isFormValid()) {
  //     setBtnStatus(false);
  //     return;
  //   }
  
  //   const sellerData = { sellerName, username, email, password };
  
  //   try {
  //     const response = await axios.post(`${process.env.REACT_APP_API_URL}/seller/register`, sellerData);
  
  //     setBtnStatus(false);
  
  //     // Handle success
      
  //     if (response.data.status === true) {
  //       // Clear form
  //       setSellerName("");
  //       setUsername("");
  //       setEmail("");
  //       setPassword("");
        
        
  //       toast.success(response.data.title);
  //       // Redirect after signup
  //       setTimeout(() => {
  //         window.location.href = "/seller/dashboard";
  //       }, 2000);
  //     }
  //   } catch (error) {
  //     setBtnStatus(false);
  
  //     // Error handling
  //     console.error("Signup Error:", error);
  
  //     if (error.response && error.response.data && error.response.data.title) {
  //       toast.error(error.response.data.title); // Backend-specific error message
  //     } else {
  //       toast.error("An unexpected error occurred. Please try again.");
  //     }
  //   }
  // };
  const signupFormHandler = async (event) => {
    event.preventDefault();
    setBtnStatus(true);
  
    const isFormValid = () => {
      let valid = true;
      if (!sellerName) { setRname(true); valid = false; } else { setRname(false); }
      if (!username) { setRusername(true); valid = false; } else { setRusername(false); }
      if (!email) { setRemail(true); valid = false; } else { setRemail(false); }
      if (!password) { setRpassword(true); valid = false; } else { setRpassword(false); }
      if (!bankName || !ifscCode || !accountNumber || !bankHolderName) { setRBank(true); valid = false; } else { setRBank(false); }
      return valid;
    };

    if (!isFormValid()) { setBtnStatus(false); return; }

    const sellerData = { sellerName, username, email, password, bank_name: bankName, ifsc_code: ifscCode, acc_no: accountNumber, bank_holder_name: bankHolderName };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/seller/register`, sellerData);
      setBtnStatus(false);

      if (response.data.status) {
        setSellerName(""); setUsername(""); setEmail(""); setPassword(""); setBankName(""); setIfscCode(""); setAccountNumber(""); setBankHolderName("");
        toast.success(response.data.title);
        setTimeout(() => { window.location.href = "/seller/login"; }, 2000);
      }
    } catch (error) {
      setBtnStatus(false);
      console.error("Signup Error:", error);
      toast.error(error.response?.data?.title || "An unexpected error occurred. Please try again.");
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

                          <h6 className="mb-1 text-center">Bank Details :</h6>
                          <div className="col-12">
                            <label
                              htmlFor="inputBankName"
                              className="form-label"
                            >
                              Bank Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputBankName"
                              placeholder="Enter Bank Name"
                              required=""
                              value={bankName}
                              onChange={(e) => {
                                setBankName(e.target.value);
                              }}
                            />
                            {rBank && !bankName && <label className="errors">Bank Name Required</label>}
                          </div>

                          <div className="col-12">
                            <label
                              htmlFor="inputIfscCode"
                              className="form-label"
                            >
                              IFSC Code
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="inputIfscCode"
                              placeholder="Enter Ifsc Code"
                              required=""
                              value={ifscCode}
                              onChange={(e) => {
                                setIfscCode(e.target.value);
                              }}
                            />
                          {rBank && !ifscCode && <label className="errors">IFSC Code Required</label>}
                          </div>

                          <div className="col-12">
                            <label
                              htmlFor="inputcardHolderName"
                              className="form-label"
                            >
                              Bank Holder's Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputcardHolderName"
                              placeholder="Enter Bank Holder's Name"
                              required=""
                              value={bankHolderName}
                              onChange={(e) => {
                                setBankHolderName(e.target.value);
                              }}
                            />
                           {rBank && !bankHolderName && <label className="errors">Account Holder's Name Required</label>}
                           </div>

                           <div className="col-12">
                            <label
                              htmlFor="inputcardno"
                              className="form-label"
                            >
                              Account Number
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="inputcardno"
                              placeholder="Account Number"
                              required=""
                              value={accountNumber}
                              onChange={(e) => {
                                setAccountNumber(e.target.value);
                              }}
                            />
                             {rBank && !accountNumber && <label className="errors">Account Number Required</label>}
                           </div>
                         

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
                                <a href="/seller/login">Log In</a>
                              </p>
                            </div>
                          </div>
                        </form>
                      </div>
                     
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
