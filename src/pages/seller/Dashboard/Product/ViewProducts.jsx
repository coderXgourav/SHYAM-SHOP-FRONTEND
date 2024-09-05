import axios from "axios";
import SellerFooter from "../../../../components/seller/SellerFooter";
import SellerHeader from "../../../../components/seller/SellerHeader";
import { useEffect, useState } from "react";

const ViewProducts = () => {
  const [productData, setProductData] = useState([]);
  const token = localStorage.getItem("sellerToken");

  console.log('prod', productData);

  // const getAllProducts = async () => {
  //   try {
  //     const res = await axios.get(`${process.env.REACT_APP_API_URL}/seller/get-all-products`, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         token: `${token}`,
  //       }
  //     });
  //     console.log('Category Data:', res.data); // Log response for debugging
  //     setProductData(res.data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const getAllProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/seller/get-all-products`, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `${token}`,
        },
      });
  
      console.log('Response Data:', res.data);
  
      // Assuming res.data contains an object with a key 'data' that is the array of products
      const productsArray = res.data.data; // Replace 'data' with the actual key if different
  
      // Ensure the productsArray is indeed an array
      if (productsArray && Array.isArray(productsArray)) {
        // Extract specific fields from each product
        const extractedProducts = productsArray.map(product => ({
          description: product.description,
          images: product.images,
          price: product.price,
          product_title: product.product_title,
          quantity: product.quantity,
        }));
  
        // Set the extracted data to productData state
        setProductData(extractedProducts);
      } else {
        console.error('Expected an array but got:', typeof productsArray);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  
  

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <SellerHeader />
      <div className="page-wrapper">
        <div className="page-content">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-lg-3 col-xl-2">
                      <a href="ecommerce-add-new-products.html" className="btn btn-primary mb-3 mb-lg-0">
                        <i className="bx bxs-plus-square"></i>New Product
                      </a>
                    </div>

                    <div className="col-lg-9 col-xl-10">
                      <form className="float-lg-end">
                        <div className="row row-cols-lg-2 row-cols-xl-auto g-2">
                          <div className="col">
                            <div className="position-relative">
                              <input type="text" className="form-control ps-5" placeholder="Search Product..." />
                              <span className="position-absolute top-50 product-show translate-middle-y">
                                <i className="bx bx-search"></i>
                              </span>
                            </div>
                          </div>

                          <div className="col">
                            <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                              <button type="button" className="btn btn-white">Sort By</button>
                              <div className="btn-group" role="group">
                                <button id="btnGroupDrop1" type="button" className="btn btn-white dropdown-toggle dropdown-toggle-nocaret px-1" data-bs-toggle="dropdown" aria-expanded="false">
                                  <i className="bx bx-chevron-down"></i>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                  <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                                  <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="col">
                            <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                              <button type="button" className="btn btn-white">Collection Type</button>
                              <div className="btn-group" role="group">
                                <button id="btnGroupDrop1" type="button" className="btn btn-white dropdown-toggle dropdown-toggle-nocaret px-1" data-bs-toggle="dropdown" aria-expanded="false">
                                  <i className="bx bxs-category"></i>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                  <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                                  <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="col">
                            <div className="btn-group" role="group">
                              <button type="button" className="btn btn-white">Price Range</button>
                              <div className="btn-group" role="group">
                                <button id="btnGroupDrop1" type="button" className="btn btn-white dropdown-toggle dropdown-toggle-nocaret px-1" data-bs-toggle="dropdown" aria-expanded="false">
                                  <i className="bx bx-slider"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-start" aria-labelledby="btnGroupDrop1">
                                  <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                                  <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>   
          
           {/* E:\samshop\server\uploads */}

          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid">
            {productData?.map((product, index) => (
              <div key={index} className="col">
                <div className="card">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${product?.images[0]}`}
                    className="card-img-top"
                    alt="Product"
                  />
                  <div className="card-body">
                    <h6 className="card-title cursor-pointer">{product.product_title}</h6>
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: product.description }}></p>
                    <div className="clearfix">
                      <p className="mb-0 float-start"><strong>{product.quantity}</strong> in stock</p>
                      <p className="mb-0 float-end fw-bold">${product.price}</p>
                    </div>
                    <div className="d-flex align-items-center mt-3 fs-6">
                      <div className="cursor-pointer">
                        {/* Replace with actual rating logic if available */}
                        <i className="bx bxs-star text-warning"></i>
                        <i className="bx bxs-star text-warning"></i>
                        <i className="bx bxs-star text-warning"></i>
                        <i className="bx bxs-star text-warning"></i>
                        <i className="bx bxs-star text-secondary"></i>
                      </div>
                      <p className="mb-0 ms-auto">4.2 (182)</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      <SellerFooter />
    </>
  );
};

export default ViewProducts;
