import { toast, ToastContainer } from "react-toastify";
import SellerFooter from "../../../../components/seller/SellerFooter";
import SellerHeader from "../../../../components/seller/SellerHeader";
import { sellerAddProduct } from "../../../../utils/seller/sellerAPI";
import Quill from "quill";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateProducts = () => {
  const [btnStatus, setBtnStatus] = useState(false);
  const [selectedFile, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  
  const [productData, setProductData] = useState([]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const [categoryData, setCategoryData] = useState([]);
  const token = localStorage.getItem("sellerToken");

  const { id } = useParams()

console.log('ppppp',productData)

  // Fetch all products
  const getAllProducts = async (id) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/seller/get-product/${id}`, {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      });
      const product = res.data.data;
     
      setProductData(product);

      // Pre-fill the form with product data
      setTitle(product.product_title);
      setDesc(product.description);
      setPrice(product.price);
      setQuantity(product.quantity);
      setCategory(product.category_id);
      setSubCategory(product.sub_category_id);
      setPreviews(product.images);
    } catch (error) {
      console.log(error.message);
    }
  };





  // Fetch category data from API
  const getCategoryData = async (page = 1) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/admin-category`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
        params: {
          page,
          limit: 20,
        },
      });
      console.log('update Data:', res.data); // Log response for debugging
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
      return toast.error("Please fill all input fields");
    } else {
      const formData = new FormData();
      formData.append("category_id", category);
      formData.append("sub_category_id", subCategory);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("category", category);
      formData.append("sub_category", subCategory);
      formData.append("desc", desc);

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
      }
      return toast[response?.data?.icon](response?.data?.title);
    }
  };

  useEffect(() => {
    getCategoryData();
    getAllProducts(id);
  }, []);

  const editorRef = useRef(null);

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
      setDesc(quill.root.innerHTML);
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
                    Update Product
                  </li>
                </ol>
              </nav>
            </div>
            <div className="ms-auto">
              <div className="btn-group">
                <a href="{{route('seller.viewProduct')}}">
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
                <h5 className="card-title">Update Product</h5>
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
      <ToastContainer />
    </>
  );
};

export default UpdateProducts;
