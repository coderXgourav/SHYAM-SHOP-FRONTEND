import React, { useEffect, useState } from "react";
import Quill from "quill";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminFooter from "../../../components/admin/AdminFooter";
import { message } from "antd";
import axios from "axios";


const AdminAddSeller = () => {
  const [sellerName, setSellerName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [desc, setDesc] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const sellerAddHandler = async (event) => {
    event.preventDefault();
    if (!sellerName || !username || !email || !password) {
      message.error("Please fill all fields");
    }
    const payload = {
      sellerName: sellerName,
      username: username,
      email: email,
      password: password,
    }
    console.log('payload', payload)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/seller/register`,
        payload,      
      );
      console.log(response.data);
      if (response.data.status) {
        message.success("Seller added successfully");
        setSellerName("");
        setUsername("");
        setEmail("");
        // setPhone("");
        setPassword("");
      } else {  
        message.error("Error adding seller");
      }
      
    } catch (error) {
      
    }
    // Add logic to submit the form data to the backend
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  // useEffect(() => {
  //   new Quill("#editor-container", {
  //     theme: "snow",
  //   });
  // }, []);

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
                    Add Seller
                  </li>
                </ol>
              </nav>
            </div>
            <div className="ms-auto">
              <div className="btn-group">
                <a href="/admin-view-seller">
                  <button type="button" className="btn-sm btn btn-primary">
                    View Sellers
                  </button>
                </a>
              </div>
            </div>
          </div>

          <form id="formSubmit" onSubmit={sellerAddHandler}>
            <div className="card">
              <div className="card-body p-4">
                <h5 className="card-title">Add New Seller</h5>
                <hr />
                <div className="form-body mt-4">
                  <div className="row">
                    <div className="col-lg-8 mx-auto">
                      <div className="border border-3 p-4 rounded">
                        <div className="mb-3">
                          <label
                            htmlFor="inputSellerName"
                            className="form-label"
                          >
                            Seller Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputSellerName"
                            placeholder="Enter seller name"
                            name="sellername"
                            required
                            onChange={(e) => {
                              setSellerName(e.target.value);
                            }}
                            value={sellerName}
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="inputSellerName"
                            className="form-label"
                          >
                            Seller UserName
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputSellerName"
                            placeholder="Enter seller username"
                            name="userName"
                            required
                            onChange={(e) => {
                              setUsername(e.target.value);
                            }}
                            value={username}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="inputSellerEmail"
                            className="form-label"
                          >
                            Seller Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="inputSellerEmail"
                            placeholder="Enter seller email"
                            name="email"
                            required
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            value={email}
                          />
                        </div>


                        <div className="mb-3">
                          <label
                            htmlFor="inputSellerEmail"
                            className="form-label"
                          >
                            Seller Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="inputSellerPassword"
                            placeholder="Enter seller password"
                            name="password"
                            required
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                            value={password}
                          />
                        </div>
                        {/* <div className="mb-3">
                          <label
                            htmlFor="inputSellerPhone"
                            className="form-label"
                          >
                            Phone Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputSellerPhone"
                            placeholder="Enter phone number"
                            name="phone"
                            required
                            onChange={(e) => {
                              setPhone(e.target.value);
                            }}
                            value={phone}
                          />
                        </div> */}
                        {/* <div className="mb-3">
                          <label
                            htmlFor="inputSellerAddress"
                            className="form-label"
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputSellerAddress"
                            placeholder="Enter address"
                            name="address"
                            required
                            onChange={(e) => {
                              setAddress(e.target.value);
                            }}
                            value={address}
                          />
                        </div> */}
                        {/* <div className="mb-3">
                          <label htmlFor>Description</label>
                          <div>
                            <div
                              id="editor-container"
                              style={{ height: "200px" }}
                            ></div>
                          </div>
                        </div> */}
                        {/* <label htmlFor="inputSellerProfilePicture">
                          Profile Picture
                        </label> */}
                        
                        {/* <div className="mb-3 border border-3 rounded p-4">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePictureChange}
                            style={{ marginBottom: "10px" }}
                            required={true}
                          />
                          {profilePicture && (
                            <div>
                              <img
                                src={profilePicture}
                                alt="Profile Preview"
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          )}

                          
                        </div> */}

                        <button
                            type="submit"
                            className="btn btn-primary"
                            id="submitBtn"
                          >
                            Add Seller
                          </button>
                      </div>
                    </div>
                    {/* <div className="col-lg-4">
                      <div className="border border-3 p-4 rounded">
                        <div className="d-grid mt-3">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            id="submitBtn"
                          >
                            Save Seller
                          </button>
                          <button
                            className="btn btn-primary"
                            type="button"
                            disabled
                            id="loadingBtn"
                            style={{ display: "none", width: "100%" }}
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
                      </div>
                    </div> */}
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

export default AdminAddSeller;
