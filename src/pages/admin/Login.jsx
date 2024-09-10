import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure to include this for styling
const Login = () => {
  const isLogin = Cookies.get("adminToken");
  const [btnStatus, setBtnStatus] = useState(false);
  const [usernameEmail, setUsernameEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rEmail, setRemail] = useState(false);
  const [rPassword, setRpassword] = useState(false);

  const adminLoginHandler = async (event) => {
    setBtnStatus(true);
    event.preventDefault();

    setRemail(!usernameEmail.length);
    setRpassword(!password.length);

    if (!usernameEmail || !password) {
      setBtnStatus(false);
      return;
    }

    const data = { adminEmail: usernameEmail, adminPassword: password };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/admin-login`,
        data
      );

      const result = response.data;
      setBtnStatus(false);

      if (result.status) {
        // Set token in cookie and redirect to dashboard
        Cookies.set("adminToken", result.token, { expires: 7 });

        toast.success("Login Successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 2000);
      } else {
        toast.error("Wrong username or password", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      setBtnStatus(false);
      toast.error("Login Failed. Please try again.", {
        transition: Bounce,
      });
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
          <div className="container">
            <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
              <div className="col mx-auto">
                <div className="card mb-0">
                  <div className="card-body">
                    <div className="p-4">
                      <div className="mb-3 text-center">
                        <img src="/logo.png" width={150} alt="" />
                      </div>
                      <div className="text-center mb-4">
                        <h5 className=""> Admin</h5>
                        <p className="mb-0">Please log in to your account</p>
                      </div>
                      <div className="form-body">
                        <form className="row g-3" onSubmit={adminLoginHandler}>
                          <div className="col-12">
                            <label
                              htmlFor="inputEmailAddress"
                              className="form-label"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="inputEmailAddress"
                              placeholder="jhon@example.com"
                              onChange={(e) => setUsernameEmail(e.target.value)}
                              value={usernameEmail}
                            />
                            {rEmail && (
                              <label htmlFor="" className="errors">
                                Email or Username Required
                              </label>
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
                                defaultValue={12345678}
                                placeholder="Enter Password"
                                minLength={4}
                                maxLength={30}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                              />

                              <a
                                href="javascript:;"
                                className="input-group-text bg-transparent"
                              >
                                <i className="bx bx-hide" />
                              </a>
                            </div>
                            {rPassword && (
                              <label htmlFor="" className="errors">
                                Password Required
                              </label>
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
                            {" "}
                            <a href="auth-basic-forgot-password.html">
                              Forgot Password ?
                            </a>
                          </div>
                          <div className="col-12">
                            <div className="d-grid">
                              <button
                                type="submit"
                                disabled={btnStatus}
                                className="btn btn-primary"
                              >
                                Sign in
                              </button>
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
        <ToastContainer />
      </div>
    </>
  );
};
export default Login;
