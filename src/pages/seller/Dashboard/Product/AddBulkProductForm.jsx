import React, { useState, useEffect } from "react";
import { message, Select, Button,Input  } from "antd"; // Import Ant Design components
import axios from "axios";
import SellerHeader from "../../../../components/seller/SellerHeader";
import SellerFooter from "../../../../components/seller/SellerFooter";
import '../../../../App.css'
import Papa from "papaparse"; // Import PapaParse

const AddBulkProductForm = () => {
    const[hasError,setHasError]=useState(false)
  const [products, setProducts] = useState([
    {
      title: "",
      price: "",
      quantity: "",
      category: "",
      subCategory: "",
      desc:"",
      images: [],
    },
  ]);
  const [categoryData, setCategoryData] = useState([]);
  const token = localStorage.getItem("sellerToken");

  // Fetch category data from API
  const getCategoryData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/seller/get-all-categories`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `${token}`,
          },
        }
      );
      setCategoryData(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);


  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        Papa.parse(file, {
            header: true,
            complete: (result) => {
                const parsedProducts = result.data.map((product) => {
                    // Find category and subcategory ObjectIds
                    const categoryId = categoryData?.categories?.find(cat => cat.name === product.category)?._id;
                    const subCategoryId = categoryData?.categories
                        .find(cat => cat._id === categoryId)
                        ?.sub_category
                        .find(sub => sub.sub === product.subCategory)?._id;

                    const missingImages= product?.images?.length===0;

                    return {
                        ...product,
                        category: categoryId, // Set category to ObjectId
                        subCategory: subCategoryId, // Set subCategory to ObjectId
                        images: product.images ? product.images.split(",").map(img => img.trim()) : [],
                        missingImages
                    };
                }).filter(product => product.title); // Filter out products without titles
                
                console.log("parsed products",parsedProducts); // Log parsed products
                setProducts(parsedProducts);
            },
            error: (error) => {
                message.error("Failed to parse CSV file.");
                console.log(error);
            },
        });
    }
};

  


  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

//   const handleFileChange = (index, files) => {
//     const updatedProducts = [...products];
//     updatedProducts[index].images = files;
//     setProducts(updatedProducts);
//   };
const handleFileChange = (index, files) => {
    const updatedProducts = [...products];
    const existingImages = updatedProducts[index].images || [];

    // Convert FileList to Array and add to existing images
    const newImages = Array.from(files);
    updatedProducts[index].images = [...existingImages, ...newImages];

    console.log(`Updated images for product ${index}:`, updatedProducts[index].images); // Debug log
    setProducts(updatedProducts);
};


  const addNewProductRow = () => {
    setProducts([
      ...products,
      {
        title: "",
        price: "",
        quantity: "",
        category: "",
        subCategory: "",
        desc:"",
        images: [],
      },
    ]);
  };

  const removeProductRow = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
     // Track if there are any errors


    for (let product of products) {
      const { title, price, quantity, category, subCategory,desc, images } = product;

       // Check for required fields including images
       if (!title || !price || !quantity || !category || !subCategory || images.length === 0) {
        setHasError(true);
        const errorMessage = `Please fill all input fields and upload images for Product .`;
        message.error(errorMessage);
        break; // Exit the loop on first error
    }

      const formData = new FormData();
      formData.append("category_id", category);
      formData.append("sub_category_id", subCategory);
      formData.append("product_title", title);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("description", desc); // Assuming description is not used in bulk for simplicity

      for (let file of images) {
        formData.append("image", file);
      }

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/seller/add-product`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `${token}`,
          },
        });
        if (response.data.status) {
          message.success("Product added successfully!");
        }
      } catch (error) {
        message.error("Error adding product.");
        console.log(error);
      }
    }
    
  };

  return (
    <>
      <SellerHeader />

      <div className="page-wrapper">
        <div className="page-content my-5 ">
          <div className="page-breadcrumb d-none d-sm-flex  align-items-center mb-3 ">
            <div className="ps-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="javascript:;">
                      <i className="bx bx-home-alt" />
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Add Products
                  </li>
                </ol>
              </nav>
            </div> 
            <div style={{position:"fixed",right:"50px"}}>
                <label htmlFor="csvUpload" className="button flex items-center cursor-pointer bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 px-4 py-2 rounded-lg transition duration-150 ease-in-out">
                        <span className="button__text">Upload CSV </span>
                        <span className="button__icon ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg">
                                <line y2="19" y1="5" x2="12" x1="12"></line>
                                <line y2="12" y1="12" x2="19" x1="5"></line>
                            </svg>
                        </span>
                    </label>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleCSVUpload}
                        style={{ display: "none" }}
                        id="csvUpload"
                    />

                   
            </div>

          </div>

          <div className="container my-4">
        <h5>Bulk Add Products</h5>
        <form onSubmit={handleSubmit} encType="multipart/form-data" > 
          <table className="table" >
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>

                <th>Price</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Images</th>
                <th>Actions</th>

                
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}  className={hasError ? 'error-highlight' : ''}>
                  <td >

                  <Input
                        className="border border-gray-300 focus:border-gray-500 focus:ring focus:ring-gray-200"
                        placeholder="Product title"
                        type="text"
                        value={product.title}
                        onChange={(e) => handleProductChange(index, "title", e.target.value)}
                        required
                        style={{ width: '100px' }} // Set minimum width
                    />      
                  </td>

                  <td >

                        <Input
                            className="border border-gray-300 focus:border-gray-500 focus:ring focus:ring-gray-200"
                            placeholder="Product Description"
                            type="text"
                            value={product.desc}
                            onChange={(e) => handleProductChange(index, "desc", e.target.value)}
                            required
                            style={{ width: '180px' }} // Set minimum width
                        />      
                        </td>

                  <td>
                  <Input
                        className="border border-gray-300 focus:border-gray-500 focus:ring focus:ring-gray-200"
                        placeholder="Price"
                        type="number"
                        value={product.price}
                        onChange={(e) =>
                            handleProductChange(index, "price", e.target.value)
                        }
                        required
                        style={{ width: '100px' }} // Set minimum width
                    />

                
                  </td>
                  <td>
                  <Input
                        className="border border-gray-300 focus:border-gray-500 focus:ring focus:ring-gray-200"
                        value={product.quantity}
                        onChange={(e) =>
                          handleProductChange(index, "quantity", e.target.value)
                        }
                        placeholder="Quantity"
                        required
                        style={{ width:"100px"}} // Set minimum width
                    />
                    
                  </td>
                  <td>
                    <Select
                      value={product.category || undefined}
                      onChange={(value) => handleProductChange(index, "category", value)}
                      placeholder="Select Category"
                      options={categoryData?.categories?.map((category) => ({
                        label: category.name,
                        value: category._id,
                      }))}
                      style={{ width: 140 }}
                      required
                    />
                  </td>
                  <td>
                    <Select
                      placeholder="Select Subcategory"
                      value={product.subCategory || undefined}
                      onChange={(value) => handleProductChange(index, "subCategory", value)}
                      options={
                        categoryData?.categories?.find(cat => cat._id === product.category)?.sub_category?.map((subcat) => ({
                          label: subcat.sub,
                          value: subcat._id,
                        })) || []
                      }
                      style={{ width: 140 }}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleFileChange(index, e.target.files)}  style={{ width: 185 }}
                      
                    />
                    {product.missingImages ? (<span style={{color:'red'}}>Images fields is required</span>):""}
                    {product.images.length > 0 && (
                        <div>
                        {Array.from(product.images).map((file, idx) => (
                            <div key={idx}>{file.name}</div> // Display the file names
                        ))}
                        </div>
                    )}

                  </td>
                <td>
                  <Button onClick={() => removeProductRow(index)}>Remove</Button>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>

          
            
               
          <Button type="button"  className="btn-sm btn btn-primary mx-2   " onClick={addNewProductRow}>
            Add Product
          </Button>
          <button class="border border-gray-300 text-gray-700 bg-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 px-3 py-1 rounded">
    Submit
</button>
          {/* <Button  className="btn-sm btn btn-primary-outline" type="submit">Submit</Button> */}
        </form>
      </div>
      </div>
    </div>



    
      <SellerFooter />
    </>
  );
};

export default AddBulkProductForm;
