// import { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";

// const AccountSetup = () => {
//   const [bankName, setBankName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [accNo, setAccNo] = useState("");
//   const [bankHolderName, setBankHolderName] = useState("");

//   const handleBankSetup = async (event) => {
//     event.preventDefault();
//     try {
//       const bankDetails = { bank_name: bankName, ifsc_code: ifscCode, acc_no: accNo, bank_holder_name: bankHolderName };

//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/user/bank-setup`,
//         bankDetails,
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );

//       if (response.data.status === true) {
//         toast.success("Bank details updated successfully!");
//         window.location.href = "/dashboard"; // Redirect to user dashboard
//       }
//     } catch (error) {
//       toast.error("Failed to update bank details. Please try again.");
//       console.error("Bank Setup Error:", error);
//     }
//   };

//   return (
//    <>
//     <div className="wrapper">
//     <div className="section-authentication-cover">
//       <div className="">
//         <div className="row g-0">
//           <div className="col-12 col-xl-7 col-xxl-8 auth-cover-left align-items-center justify-content-center d-none d-xl-flex">
//             <div className="card shadow-none bg-transparent shadow-none rounded-0 mb-0">
//               <div className="card-body">
//                 <img
//                   src="/assets/images/login-images/register-cover.svg"
//                   className="img-fluid auth-img-cover-login"
//                   width={550}
//                   alt=""
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-xl-5 col-xxl-4 auth-cover-right align-items-center justify-content-center">
//             <div className="card rounded-0 m-3 shadow-none bg-transparent mb-0">
//               <div className="card-body p-sm-5">
//                 <div className="">
//                   <div className="mb-3 text-center">
//                     <img src="/logo.png" width="150px" alt="" />
//                   </div>
//                   <hr />
//                   <div className="text-center mb-4">
//                     <h5 className=""> Sign up</h5>
//                     <p className="mb-0">
//                       Please fill the below details to create your account
//                     </p>
//                   </div>
//                   <div className="form-body">
//                     <form className="row g-3" onSubmit={handleBankSetup}>
//                       <div className="col-12">
//                         <label
//                           htmlFor="inputBankname"
//                           className="form-label"
//                         >
//                           Bank Name
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="inputBankname"
//                           placeholder="Enter Bank Name"
                                                
                        

//                           value={bankName} onChange={(e) => setBankName(e.target.value)} required
//                         />
//                         {bankName ? (
//                           <label className="errors">
//                             Please Fill the Bank Name Field
//                           </label>
//                         ) : (
//                           ""
//                         )}
//                       </div>
//                       <div className="col-12">
//                         <label
//                           htmlFor="inputIfscCode"
//                           className="form-label"
//                         >
//                           IFSC Code
//                         </label>

//                         <input
//                           type="number"
//                           className="form-control"
//                           id="inputIfscCode"
//                           placeholder="Enter IFSC Code"
//                           value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} required
//                         />
//                         {ifscCode ? (
//                           <label className="errors">
//                             IFSC Code Required
//                           </label>
//                         ) : (
//                           ""
//                         )}
//                       </div>
//                       <div className="col-12">
//                         <label
//                           htmlFor="inputEmailAddress"
//                           className="form-label"
//                         >
//                           Email Address
//                         </label>
//                         <input
//                           type="email"
//                           className="form-control"
//                           id="inputEmailAddress"
//                           placeholder="example@user.com"
//                           required=""
//                           value={email}
//                           onChange={(e) => {
//                             setEmail(e.target.value);
//                           }}
//                         />
//                         {rEmail ? (
//                           <label className="errors">
//                             Please type your Email
//                           </label>
//                         ) : (
//                           ""
//                         )}
//                       </div>
//                       <div className="col-12">
//                         <label
//                           htmlFor="inputChoosePassword"
//                           className="form-label"
//                         >
//                           Password
//                         </label>
//                         <div
//                           className="input-group"
//                           id="show_hide_password"
//                         >
//                           <input
//                             type="password"
//                             className="form-control border-end-0"
//                             id="inputChoosePassword"
//                             defaultValue=""
//                             placeholder="Enter Password"
//                             name="password"
//                             required=""
//                             minLength={4}
//                             maxLength={30}
//                             value={password}
//                             onChange={(e) => {
//                               setPassword(e.target.value);
//                             }}
//                           />

//                           <a
//                             href="javascript:;"
//                             className="input-group-text bg-transparent"
//                           >
//                             <i className="bx bx-hide" />
//                           </a>
//                         </div>
//                         {rPassword ? (
//                           <label className="errors">
//                             Choose a Password
//                           </label>
//                         ) : (
//                           ""
//                         )}
//                       </div>
                    
//                       <br />
//                       <div className="col-12">
//                         <div className="d-grid">
//                           <button
//                             type="submit"
//                             className="btn btn-primary"
//                             id="submitBtn"
//                             disabled={btnStatus}
//                           >
//                             Sign up
//                           </button>
//                           <button
//                             className="btn btn-primary"
//                             type="button"
//                             disabled=""
//                             id="loadingBtn"
//                             style={{ display: "none" }}
//                           >
//                             {" "}
//                             <span
//                               className="spinner-border spinner-border-sm"
//                               role="status"
//                               aria-hidden="true"
//                             />
//                             <span className="visually-hidden">
//                               Loading...
//                             </span>
//                           </button>
//                         </div>
//                       </div>
//                       <ToastContainer />
//                       <div className="col-12">
//                         <div className="text-center ">
//                           <p className="mb-0">
//                             Already have an account?{" "}
//                             <a href="/seller/login">Log In</a>
//                           </p>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
                 
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/*end row*/}
//       </div>
//     </div>
//   </div>



//   <form onSubmit={handleBankSetup}>
//       <div>
//         <label>Bank Name</label>
//         <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} required />
//       </div>
//       <div>
//         <label>IFSC Code</label>
//         <input type="text" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} required />
//       </div>
//       <div>
//         <label>Account Number</label>
//         <input type="text" value={accNo} onChange={(e) => setAccNo(e.target.value)} required />
//       </div>
//       <div>
//         <label>Bank Holder Name</label>
//         <input type="text" value={bankHolderName} onChange={(e) => setBankHolderName(e.target.value)} required />
//       </div>
//       <button type="submit">Save Bank Details</button>
//       <ToastContainer />
//     </form>
//    </>


  
//   );
// };

// export default AccountSetup;
