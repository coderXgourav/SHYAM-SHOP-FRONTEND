// import { toast, ToastContainer } from "react-toastify";
import SellerFooter from "../../../../components/seller/SellerFooter";
import SellerHeader from "../../../../components/seller/SellerHeader";
import axios from "axios";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { message, Spin } from "antd"; // Import Ant Design components

const UpdateProducts = () => {
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
  const [singleProduct, setSingleProduct] = useState([]);

  const [loading, setLoading] = useState(false); // Added loading state

  const token = localStorage.getItem("sellerToken");
  const { id } = useParams();

  console.log("id", id);

  useEffect(() => {
    getCategoryData();
    getSingleProducts();
  }, []);

  const getCategoryData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/seller/get-all-categories`,
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      setCategoryData(res.data);
    } catch (error) {
      console.log("Error fetching categories:", error.message);
    }
  };

  const getSingleProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/seller/get-single-product/${id}`,
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      const product = res.data.data;
      setSingleProduct(product);
      setTitle(product.product_title);
      setDesc(product.description);
      setPrice(product.price);
      setQuantity(product.quantity);
      setCategory(product.category_id?._id);
      setSubCategory(product.sub_category_id);
      setPreviews(
        product.images.map(
          (img) => `${process.env.REACT_APP_API_URL}/upload/${img}`
        )
      );
    } catch (error) {
      console.log("Error fetching product:", error.message);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const uploadImage = [];
    for (let i = 0; i < files.length; i++) {
      uploadImage.push(files[i]);
    }
    setSelectedFiles(uploadImage);

    const newPreviews = uploadImage.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const productUpdateHandler = async (event) => {
    event.preventDefault();
    setBtnStatus(true);
    setLoading(true); // Set loading to true when fetching starts

    // Validate form fields
    if (!title || !price || !quantity || !category || !subCategory || !desc) {
      setBtnStatus(false);
      return message.error("Please fill all input fields");
    }

    const formData = new FormData();

    // Append form fields
    formData.append("product_title", title);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("description", desc);
    formData.append("category_id", category);
    formData.append("sub_category_id", subCategory);

    // Append new images if any
    if (selectedFile.length > 0) {
      selectedFile.forEach((file) => {
        formData.append("image", file);
      });
    }

    // Append existing image filenames for the backend to keep (if applicable)
    if (previews.length > 0) {
      previews.forEach((preview) => {
        const imageName = preview.split("/").pop(); // Extract filename from URL
        formData.append("images", imageName); // Use a separate key to pass existing images
      });
    }

    try {
      console.log("Product Title:", title);
      console.log("Price:", price);
      console.log("Quantity:", quantity);
      console.log("Description:", desc);
      console.log("Category:", category);
      console.log("SubCategory:", subCategory);
      console.log("Selected Files:", selectedFile);
      console.log("Previews:", previews);

      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/seller/update-products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the header is set for form-data
            token: `${token}`, // Use Authorization header for token
          },
        }
      );

      message.success("Product updated successfully");

      // console.log("API Response:", response);

      setBtnStatus(false);

      setTimeout(() => {
        window.location.reload();
      }, 200);

      if (response.data.status) {
        // Resetting form fields
        // setTitle("");
        // setDesc("");
        // setPrice("");
        // setQuantity("");
        // setCategory("");
        // setSubCategory("");
        // setSelectedFiles([]);
        // setPreviews([]);
        // toast.success(response.data.title);
      } else {
        message.error("Failed to update product");
      }
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response ? error.response.data : error.message
      );
      message.error("An error occurred while updating the product");
      setBtnStatus(false);
    } finally {
      setLoading(false); // Set loading to false when fetching completes
    }
  };

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    quillRef.current = new Quill(editorRef.current, {
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

    quillRef.current.on("text-change", () => {
      setDesc(quillRef.current.root.innerHTML);
    });

    return () => {
      quillRef.current.off("text-change");
    };
  }, []);
  useEffect(() => {
    if (quillRef.current && desc !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = desc;
    }
  }, [desc]);

  const selectedCategory = categoryData?.categories?.find(
    (cat) => cat._id === category
  );
  const filteredSubCategories = selectedCategory
    ? selectedCategory.sub_category
    : [];

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
                    Update Product
                  </li>
                </ol>
              </nav>
            </div>
            <div className="ms-auto">
              <div className="btn-group">
                <a href="#">
                  <button type="button" className="btn-sm btn btn-primary">
                    View Products
                  </button>
                </a>
              </div>
            </div>
          </div>

          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "400px" }}
            >
              <Spin size="large" />
            </div>
          ) : (
            <form onSubmit={productUpdateHandler} encType="multipart/form-data">
              <div className="card">
                <div className="card-body p-4">
                  <h5 className="card-title">Update Product</h5>
                  <hr />
                  <div className="form-body mt-4">
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="border border-3 p-4 rounded">
                          <div className="mb-3">
                            <label
                              htmlFor="inputProductTitle"
                              className="form-label"
                            >
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
                            <label htmlFor="editor-container">
                              Description
                            </label>
                            <div
                              ref={editorRef}
                              id="editor-container"
                              style={{ height: "200px" }}
                            ></div>
                          </div>

                          <label htmlFor="product-images">
                            Choose Product images{" "}
                            <span className="text text-primary text-sm">
                              ( Select up to 4 Images )
                            </span>
                          </label>
                          <div className="mb-3 border border-3 rounded p-4">
                            <input
                              type="file"
                              accept="image/*"
                              name="files"
                              multiple
                              onChange={handleFileChange}
                              style={{ marginBottom: "10px" }}
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
                              <label
                                htmlFor="inputCostPerPrice"
                                className="form-label"
                              >
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
                              <label
                                htmlFor="inputStarPoints"
                                className="form-label"
                              >
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
                              <label
                                htmlFor="inputProductType"
                                className="form-label"
                              >
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

                              <label
                                htmlFor="inputSubCategoryType"
                                className="form-label my-3"
                              >
                                Sub-category Type
                              </label>
                              <select
                                className="form-select"
                                id="inputSubCategoryType"
                                name="sub_category"
                                onChange={(e) => setSubCategory(e.target.value)}
                                value={subCategory}
                                disabled={!category}
                                style={{ color: "#222" }}
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
                            </div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mt-3">
                          <button
                            type="submit"
                            className="btn btn-primary me-2"
                            disabled={btnStatus}
                          >
                            {btnStatus ? "Updating..." : "Update Product"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      <SellerFooter />
      {/* <ToastContainer /> */}
    </>
  );
};

export default UpdateProducts;
