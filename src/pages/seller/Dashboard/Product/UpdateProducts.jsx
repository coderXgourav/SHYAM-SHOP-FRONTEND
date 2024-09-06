import { toast, ToastContainer } from "react-toastify";
import SellerFooter from "../../../../components/seller/SellerFooter";
import SellerHeader from "../../../../components/seller/SellerHeader";
import { sellerAddProduct } from "../../../../utils/seller/sellerAPI";
import Quill from "quill";
import "quill/dist/quill.snow.css"; 
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateProducts = () => {
  const [btnStatus, setBtnStatus] = useState(false);
  const [selectedFile, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  
  const [productData, setProductData] = useState([]);
  const [updatedProduct,setUpdatedProduct]=useState([])
  const [singleProduct,setSingleProduct]=useState([])


  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const [categoryData, setCategoryData] = useState([]);
  const token = localStorage.getItem("sellerToken");

  const {id}=useParams()

console.log('ppppp',productData)
console.log('upd',updatedProduct)
console.log('singleprod',singleProduct)
console.log('idd',id)
console.log('categ6556ory',category)
console.log('sub-c5656at',subCategory)

  const getAllProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/seller/get-all-products`, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `${token}`,
        },
      });

            
            setProductData(res.data.data);



    } catch (error) {
      console.log(error.message);
    }
  };


  const getSingleProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/seller/get-single-product/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `${token}`,
        },
      });
      
      const product = res.data.data;
     
      const products= res.data;
      setSingleProduct(product);

      
            // Pre-fill the form with product data
            setTitle(product.product_title);
            setDesc(product.description);
            setPrice(product.price);
            setQuantity(product.quantity);

            setCategory(product.category_id?._id);
            setSubCategory(product.sub_category_id);
            


      // Pre-fill image previews from previously uploaded images
      setPreviews(product.images.map((img) => `${process.env.REACT_APP_API_URL}/upload/${img}`)); 
      console.log('preview',previews)

    } catch (error) {
      console.log(error.message);
    }
  };


  // Handle product update
  const productUpdateHandler = async (event) => {
    event.preventDefault();
    setBtnStatus(true);

    const formData = new FormData();

    if (title) formData.append("title", title);
    if (price) formData.append("price", price);
    if (quantity) formData.append("quantity", quantity);
    if (desc) formData.append("desc", desc);
    if (category) formData.append("category_id", category);
    if (subCategory) formData.append("sub_category_id", subCategory);

    if (selectedFile.length > 0) {
      for (let file of selectedFile) {
        formData.append("files", file);
      }
    }

    if (selectedFile.length === 0 && previews.length > 0) {
      previews.forEach((preview, idx) => {
        const imageName = preview.split('/').pop(); // Extract filename from URL
        formData.append(`existing_images[${idx}]`, imageName);
      });
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/seller/update-products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `${token}`,
          },
        }
      );

      setBtnStatus(false);

      setUpdatedProduct(response.data)

      if (response.data.status) {
        setTitle("");
        setDesc("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setSubCategory("");
        setSelectedFiles([]);
        setPreviews([]);
        toast.success(response.data.title);
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred while updating the product");
      setBtnStatus(false);
    }
  };

  


  // const productUpdateHandler = async (event) => {
  //   event.preventDefault();
  //   setBtnStatus(true);
  
  //   // Create a FormData object
  //   const formData = new FormData();
  //   formData.append("category_id", category);
  //   formData.append("sub_category_id", subCategory);
  //   formData.append("title", title);
  //   formData.append("price", price);
  //   formData.append("quantity", quantity);
  //   formData.append("desc", desc);
  
  //   // Add newly selected images (if any)
  //   if (selectedFile.length > 0) {
  //     for (let file of selectedFile) {
  //       formData.append("image", file);
  //     }
  //   }
  
  //   try {
  //     const response = await axios.put(`${process.env.REACT_APP_API_URL}/seller/update-products/${id}`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         token: `${token}`,
  //       },
  //     });
  
  //     setBtnStatus(false);
  
  //     if (response.data.status) {
  //       // Clear form fields if necessary (optional)
  //       setTitle("");
  //       setDesc("");
  //       setPrice("");
  //       setQuantity("");
  //       setCategory("");
  //       setSubCategory("");
  //       setSelectedFiles([]);
  //       toast.success("Product updated successfully");
  //     } else {
  //       toast.error("Failed to update product");
  //     }
  
  //   } catch (error) {
  //     console.error("Error updating product:", error);
  //     toast.error("An error occurred while updating the product");
  //     setBtnStatus(false);
  //   }
  // };
  


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
    const files  = e.target.files;

    for (let items of files ) {
      uploadImage.push(items);
    }

    setSelectedFiles(uploadImage);

    const newPreviews = uploadImage.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };



  useEffect(() => {
    getCategoryData();
    getAllProducts();
    // updateProducts();
    getSingleProducts();
  }, []);

 


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

    // Update the desc state whenever the content changes
    quillRef.current.on("text-change", () => {
      setDesc(quillRef.current.root.innerHTML);
    });

    return () => {
      quillRef.current.off("text-change");
    };
  }, []);

  // Set the initial content of the Quill editor when desc is available
  useEffect(() => {
    if (quillRef.current && desc) {
      quillRef.current.root.innerHTML = desc;
    }
  }, [desc]);



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
                            name="files"
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
