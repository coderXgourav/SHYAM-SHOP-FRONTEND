import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../../../components/admin/AdminHeader';
import AdminFooter from '../../../components/admin/AdminFooter';
import Cookies from 'js-cookie';

const AdminCoupons = () => {
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage', // default type
    discountValue: 0,
    minimumPurchase: 0,
    maxDiscountAmount: 0,
    firstOrderOnly: false,
    applicableCategories:[],
    time_usage:1,
    expirationDate: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [categories, setCategories] = useState([]);


console.log('categoryww',categories)
console.log('foemdata',formData)
  


const handleSelectAll = (e) => {
  const { checked } = e.target;
  if (checked) {
    setFormData((prev) => ({
      ...prev,
      applicableCategories: categories.map((category) => category._id) // Select all category IDs
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      applicableCategories: [] // Clear selection
    }));
  }
};




  const fetchCategories = async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/admin-category`,
        {
          headers: {
            Authorization: `${Cookies.get("adminToken")}`,
          }
        }
      );
      setCategories(response.data.categories);
      
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setLoading(false); // Set loading to false when fetching completes
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === 'checkbox') {
      // For checkboxes, update applicableCategories
      setFormData((prevState) => {
        const newCategories = checked
          ? [...prevState.applicableCategories, value] // Add category
          : prevState.applicableCategories.filter((cat) => cat !== value); // Remove category
        return {
          ...prevState,
          [name]: newCategories,
        };
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };
  

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: type === 'checkbox' ? checked : value,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Validation
    const { discountValue, minimumPurchase, maxDiscountAmount, expirationDate, discountType } = formData;

    // Check required fields
    if (!expirationDate) {
      setLoading(false);
      setMessage({ type: 'error', text: 'Expiration date is required.' });
      return;
    }

    if (discountType === 'percentage') {
      if (!discountValue || discountValue <= 0) {
        setLoading(false);
        setMessage({ type: 'error', text: 'Discount value is required and must be greater than 0.' });
        return;
      }

      if (maxDiscountAmount < 0) {
        setLoading(false);
        setMessage({ type: 'error', text: 'Max discount amount cannot be negative.' });
        return;
      }
    }

    // Additional validation for minimum purchase
    if (minimumPurchase < 0) {
      setLoading(false);
      setMessage({ type: 'error', text: 'Minimum purchase cannot be negative.' });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/coupons/create-coupons`,
        formData,
        {
          headers: {
            Authorization: `${Cookies.get('adminToken')}`,
          },
        }
      );
      setLoading(false);
      setMessage({ type: 'success', text: 'Coupon created successfully!' });

      // Hide the success message after 4 seconds
      setTimeout(() => {
        setMessage(null);
      }, 4000);

      // Reset form after successful submission
      setFormData({
        code: '',
        discountType: 'percentage',
        discountValue: 0,
        minimumPurchase: 0,
        maxDiscountAmount: 0,
        firstOrderOnly: false,
        expirationDate: ''
      });
    } catch (error) {
      setLoading(false);
      setMessage({ type: 'danger', text: 'Coupon already exists!' });
      
      // Hide the error message after 4 seconds
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    }
  };

  return (
    <>
      <AdminHeader />

      <div className="page-wrapper">
        <div className="page-content">
          {/* Breadcrumb */}
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
                    Create Coupons
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          {/* Coupon Form */}
          <div className="card p-4" style={{ width: '90%' }}>
            <h5 className="mb-4">Create New Coupon</h5>

            {message && (
              <div
                className={`alert ${
                  message.type === 'success' ? 'alert-success' : 'alert-danger'
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group col-md-6 mb-3">
                  <label>Coupon Code</label>
                  <input
                    type="text"
                    name="code"
                    className="form-control"
                    value={formData.code}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group col-md-6 mb-3">
                  <label>Discount Type</label>
                  <select
                    name="discountType"
                    className="form-control"
                    value={formData.discountType}
                    onChange={handleChange}
                  >
                    <option value="percentage">Percentage</option>
                    <option value="buy1get1">Buy 1 Get 1</option>
                    <option value="firstOrder">First Order</option>
                   
                    
                    <option value="fixedAmount">Fixed Amount</option>
                  </select>
                </div>

                {formData.discountType !== 'buy1get1' && (
                  <div className="form-group col-md-6 mb-3">
                    <label>Discount Value (%)</label>
                    <input
                      type="number"
                      name="discountValue"
                      className="form-control"
                      value={formData.discountValue}
                      onChange={handleChange}
                      min="1"
                      max="100"
                    
                      required
                    />
                  </div>
                )}

                

           
              <div className="form-group col-md-6 mb-3">
                <label>Categories</label>
                {loading ? (
                  <p>Loading categories...</p>
                ) : (
                  <div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="selectAll"
                        checked={formData.applicableCategories?.length === categories?.length}
                        onChange={handleSelectAll}
                      />
                      <label className="form-check-label" htmlFor="selectAll">
                        Select All
                      </label>
                    </div>
                    <div
                      style={{
                        maxHeight: '150px', // Adjust height as needed
                        overflowY: 'auto',   // Enable vertical scroll
                        border: '1px solid #ccc', // Optional: add a border
                        borderRadius: '5px', // Optional: rounded corners
                        padding: '5px' // Optional: padding
                      }}
                    >
                      {categories.map((category) => (
                        <div className="form-check" key={category._id}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={category._id}
                            name="applicableCategories"
                            value={category._id}
                            checked={formData.applicableCategories?.includes(category._id)}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor={category._id}>
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
         



                {formData.discountType !== 'buy1get1' && (
                  <div className="form-group col-md-6 mb-3">
                    <label>Max Discount Amount</label>
                    <input
                      type="number"
                      name="maxDiscountAmount"
                      className="form-control"
                      value={formData.maxDiscountAmount}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="form-group col-md-6 mb-3 d-flex gap-4">
                 <div style={{width:"50%"}}>
                 <label>Expiration Date</label>
                  <input
                    type="date"
                    name="expirationDate"
                    className="form-control"
                    value={formData.expirationDate}
                    onChange={handleChange}
                    required
                  />
                 </div>

                 <div style={{width:"50%"}}>
                    <label>Coupon Limit</label>
                    <input
                    type="number"
                    name="time_usage" // Change to "time_usage" for coupon limit
                    className="form-control"
                    value={formData.time_usage || ''} // Use formData.time_usage
                    onChange={handleChange}
                    required
                    min="1" // Ensure at least 1 usage limit
                    />
                </div>
                  
                </div>

                <div className="form-group col-md-6 mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="firstOrderOnly"
                      checked={formData.firstOrderOnly}
                      onChange={handleChange}
                      disabled={formData.discountType !== 'firstOrder'}
                    />
                    <label className="form-check-label">First Order Only</label>
                  </div>
                </div>

                {formData.discountType !== 'buy1get1' && (
                <div className="form-group col-md-6 mb-3">
                  <label>Minimum Purchase</label>
                  <input
                    type="number"
                    name="minimumPurchase"
                    className="form-control"
                    value={formData.minimumPurchase}
                    onChange={handleChange}
                  />
                </div>
                )}

              </div>
              {/* Submit button placed outside the form */}
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Creating Coupon...' : 'Create Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <AdminFooter />
    </>
  );
};

export default AdminCoupons;
