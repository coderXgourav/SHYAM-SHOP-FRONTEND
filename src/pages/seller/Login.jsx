import { useState } from "react";
import { sellerLogin } from "../../utils/seller/sellerAPI";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [btnStatus, setBtnStatus] = useState(false);
  const isLogin = localStorage.getItem("sellerToken");
  if (isLogin) {
    window.location = "/seller/dashboard";
  }
  const [usernameEmail, setUsernameEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rEmail, setRemail] = useState(false);
  const [rPassword, setRpassword] = useState(false);

  const sellerLoginHandler = async (event) => {
    setBtnStatus(true);
    event.preventDefault();
    if (usernameEmail.length > 0) {
      setRemail(false);
    } else {
      setRemail(true);
    }
    if (password.length > 0) {
      setRpassword(false);
    } else {
      setRpassword(true);
    }
    if (!usernameEmail || !password) {
      setBtnStatus(false);
    } else {
      const data = { usernameEmail, password };
      const response = await sellerLogin(data);
      setBtnStatus(false);
      toast[response.icon](response.title);
      console.log(response);
      if (response.status) {
        setTimeout(() => {
          window.location = "/seller/dashboard";
        }, 2000);
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="section-authentication-cover">
        <div className="">
          <div className="row g-0">
            <div className="col-12 col-xl-7 col-xxl-8 auth-cover-left align-items-center justify-content-center d-none d-xl-flex">
              <div className="card shadow-none bg-transparent shadow-none rounded-0 mb-0">
                <div className="card-body">
                  <img
                    src="/assets/images/login-images/login-cover.svg"
                    className="img-fluid auth-img-cover-login"
                    width={650}
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
                      <h5 className=""> Sign in </h5>
                      <p className="mb-0">Please log in to your account</p>
                    </div>
                    <div className="form-body">
                      <form
                        className="row g-3"
                        id="formSubmit"
                        onSubmit={sellerLoginHandler}
                      >
                        <input
                          type="hidden"
                          id="url"
                          defaultValue="/seller/signin"
                        />
                        <input
                          type="hidden"
                          id="dataType"
                          defaultValue="POST"
                        />
                        <div className="col-12">
                          <label
                            htmlFor="inputEmailAddress"
                            className="form-label"
                          >
                            Email or Username
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="jhon@example.com"
                            required=""
                            onChange={(e) => {
                              setUsernameEmail(e.target.value);
                            }}
                            value={usernameEmail}
                          />
                          {rEmail ? (
                            <label htmlFor="" className="errors">
                              Email or Username Required
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
                          <div className="input-group" id="show_hide_password">
                            <input
                              type="password"
                              className="form-control border-end-0"
                              placeholder="Enter Password"
                              required=""
                              minLength={4}
                              maxLength={30}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                              value={password}
                            />
                            <a
                              href="javascript:;"
                              className="input-group-text bg-transparent"
                            >
                              <i className="bx bx-hide" />
                            </a>
                          </div>{" "}
                          {rPassword ? (
                            <label htmlFor="" className="errors">
                              Password Required
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="col-md-6">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="flexSwitchCheckChecked"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexSwitchCheckChecked"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 text-end">
                          <a href="#">Forgot Password ?</a>
                        </div>
                        <div className="col-12">
                          <div className="d-grid">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              id="submitBtn"
                              disabled={btnStatus}
                            >
                              Sign in
                            </button>
                          </div>
                        </div>
                        <ToastContainer />
                        <div className="col-12">
                          <div className="text-center">
                            <p className="mb-0">
                              Don't have an account yet?{" "}
                              <a href="/seller/signup">Sign up here</a>
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
  );
};

export default Login;
