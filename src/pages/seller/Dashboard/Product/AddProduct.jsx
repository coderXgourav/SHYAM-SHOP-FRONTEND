import SellerFooter from "../../../../components/seller/SellerFooter";
import SellerHeader from "../../../../components/seller/SellerHeader";
import { sellerAddProduct } from "../../../../utils/seller/sellerAPI";
import Quill from "quill";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { message } from "antd"; // Import Ant Design components

const AddProduct = () => {
  const [btnStatus, setBtnStatus] = useState(false);
  const [selectedFile, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const [categoryData, setCategoryData] = useState([]);

  const [isRefundable, setIsRefundable] = useState(false); 
  
  const token = localStorage.getItem("sellerToken");

  console.log('isRefundable',isRefundable)

  // Fetch category data from API
  const getCategoryData = async (page = 1) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/seller/get-all-categories`, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `${token}`,
        },
      });
      console.log('Category Data:', res.data); // Log response for debugging
      setCategoryData(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFileChange = (e) => {
    const uploadImage = [];
    const images = e.target.files;

    for (let items of images) {
      uploadImage.push(items);
    }

    setSelectedFiles(uploadImage);

    const newPreviews = uploadImage.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const productAddHandler = async (event) => {
    event.preventDefault();
    setBtnStatus(true);

    if (!title || !price || !quantity || !category || !subCategory || !desc) {
      setBtnStatus(false);
      return message.error("Please fill all input fields");
    } else {
      const formData = new FormData();
      formData.append("category_id", category);
      formData.append("sub_category_id", subCategory);
      formData.append("product_title", title);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("sub_category", subCategory);
      formData.append("description", desc);
      formData.append("isRefundable", isRefundable); // Append isRefundable to form data

      for (let file of selectedFile) {
        formData.append("image", file);
      }

      const response = await sellerAddProduct(formData);
      setBtnStatus(false);
      if (response.data.status) {
        setTitle("");
        setDesc("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setSubCategory("");
        setSelectedFiles([]);
        setIsRefundable(false); // Reset isRefundable if using a checkbox or input
      }
      return message.success("Product Added Successfully");
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  const editorRef = useRef(null);

const stripHtmlTags = (html) => {
  // Handle common HTML tags added during copy-paste or manual typing
  return html
    .replace(/<p[^>]*>/g, '')  // Remove opening <p> tags
    .replace(/<\/p>/g, '')     // Remove closing <p> tags
    .replace(/<div[^>]*>/g, '')  // Remove opening <div> tags
    .replace(/<\/div>/g, '')     // Remove closing <div> tags
    .replace(/<span[^>]*>/g, '') // Remove opening <span> tags
    .replace(/<\/span>/g, '')    // Remove closing <span> tags
    .replace(/<br\s*\/?>/g, '\n') // Replace <br> tags with newlines
    .replace(/<[^>]+>/g, '');   // Remove any remaining HTML tags
};

useEffect(() => {
  // Initialize Quill editor
  const quill = new Quill(editorRef.current, {
    theme: "snow",
    modules: {
      toolbar: [
        [{ header: "1" }, { header: "2" }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline"],
        ["link"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["clean"],
      ],
    },
  });

  // Update the desc state whenever the content changes
  quill.on("text-change", () => {
    const rawHtml = quill.root.innerHTML;
    const cleanedHtml = stripHtmlTags(rawHtml);
    setDesc(cleanedHtml); // Ensure setDesc updates the state properly
  });

  // Cleanup on unmount
  return () => {
    quill.off("text-change");
  };
}, []);

  

  // Filter subcategories based on the selected category
  const selectedCategory = categoryData?.categories?.find(cat => cat._id === category);
  const filteredSubCategories = selectedCategory ? selectedCategory.sub_category : [];

  console.log('Selected Category:', selectedCategory);
  console.log('Filtered Subcategories:', filteredSubCategories);

  return (
    <>
      <SellerHeader />
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
                    Add Product
                  </li>
                </ol>
              </nav>
            </div>

            
            <div className="ms-auto ">
              <div className="btn-group dflex gap-2">

              <a href="add-bulk-products">
                  <button type="button" className="btn-sm btn btn-primary">
                    Bulk Add
                  </button>
                </a>

                <a href="/view-products">
                  <button type="button" className="btn-sm btn btn-primary">
                    View Products
                  </button>
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={productAddHandler} encType="multipart/form-data">
            <div className="card">
              <div className="card-body p-4">
                <h5 className="card-title">Add New Product</h5>
                <hr />
                <div className="form-body mt-4">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="border border-3 p-4 rounded">
                        <div className="mb-3">
                          <label htmlFor="inputProductTitle" className="form-label">
                            Product Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputProductTitle"
                            placeholder="Enter product title"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor>Description</label>
                          <div ref={editorRef} id="editor-container" style={{ height: "200px" }}></div>
                        </div>

                        <label htmlFor>
                          Choose Product images{" "}
                          <span className="text text-primary text-sm">( Select up to 4 Images )</span>
                        </label>
                        <div className="mb-3 border border-3 rounded p-4">
                          <input
                            type="file"
                            accept="image/*"
                            name="image"
                            multiple
                            onChange={handleFileChange}
                            style={{ marginBottom: "10px" }}
                            required
                          />
                        </div>
                        {previews.map((preview, index) => (
                          <img
                            key={index}
                            src={preview}
                            alt={`Preview ${index}`}
                            style={{
                              width: "200px",
                              height: "auto",
                              marginTop: "10px",
                              marginRight: "10px",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="border border-3 p-4 rounded">
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label htmlFor="inputCostPerPrice" className="form-label">
                              Price
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="inputCostPerPrice"
                              placeholder="Product Price"
                              name="price"
                              onChange={(e) => setPrice(e.target.value)}
                              value={price}
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="inputStarPoints" className="form-label">
                              Quantity
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="inputStarPoints"
                              placeholder="Quantity of products in stock"
                              name="quantity"
                              onChange={(e) => setQuantity(e.target.value)}
                              value={quantity}
                            />
                          </div>
                          <div className="col-12">
                            <label htmlFor="inputProductType" className="form-label">
                              Category Type
                            </label>
                            <select
                              className="form-select"
                              id="inputProductType"
                              name="category"
                              onChange={(e) => {
                                const selectedCategoryId = e.target.value;
                                setCategory(selectedCategoryId);
                                setSubCategory(""); // Clear sub-category when category changes
                              }}
                              value={category}
                            >
                              <option value="">Select Category</option>
                              {categoryData?.categories?.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                  {cat.name}
                                </option>
                              ))}
                            </select>

                            <label htmlFor="inputSubCategoryType" className="form-label my-3">
                              Sub-category Type
                            </label>
                            <select
                              className="form-select"
                              id="inputSubCategoryType"
                              name="sub_category"
                              onChange={(e) => setSubCategory(e.target.value)}
                              value={subCategory}
                              disabled={!category}
                              style={{color:"#222"}} // Disable if no category is selected
                            >
                              <option value="">Select Sub-category</option>
                              {filteredSubCategories.length > 0 ? (
                                filteredSubCategories.map((sub) => (
                                  <option key={sub._id} value={sub._id}>
                                    {sub.sub}
                                  </option>
                                ))
                              ) : (
                                <option value="" disabled>
                                  No subcategory available
                                </option>
                              )}
                            </select>

                            <div className="form-check form-switch mt-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="isRefundableCheckbox"
                            checked={isRefundable}
                            onChange={(e) => setIsRefundable(e.target.checked)}
                          />
                          <label className="form-check-label" htmlFor="isRefundableCheckbox">Is Refundable</label>
                        </div>
                        
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary me-2"
                    disabled={btnStatus}
                  >
                    {btnStatus ? "Adding..." : "Add Product"}
                  </button>
                </div>



                    </div>
                  </div>
                </div>
               
              </div>
            </div>
          </form>
        </div>
      </div>
      <SellerFooter />
      
    </>
  );
};

export default AddProduct;
