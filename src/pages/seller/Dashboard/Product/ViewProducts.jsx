import axios from "axios";
import SellerFooter from "../../../../components/seller/SellerFooter";
import SellerHeader from "../../../../components/seller/SellerHeader";
import { useEffect, useState } from "react";
import { Popconfirm, message } from "antd"; // Import Ant Design components

const ViewProducts = () => {
  const [productData, setProductData] = useState([]);
  const token = localStorage.getItem("sellerToken");

  console.log('prodData',productData)

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

  // Delete product function
  const deleteProduct = async (productId) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/seller/delete-products/${productId}`,
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      if (res.data.status === true) {
        message.success("Product deleted successfully!");
        getAllProducts(); // Refresh products after deletion
      } else {
        message.error("Failed to delete the product!");
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
      message.error("Error deleting product");
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

          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid" style={{ transition: "all 1s ease-in-out" }}>
            {productData.length!==0 ? (productData?.map((product, index) => (
              <div key={index} className="col">
                <div className="card" style={{ width: "200px", height: "400px" }}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/upload/${product?.images[0]}`}
                    className="card-img-top mx-auto"
                    alt={product?.product_title || "Product Image"}
                    style={{ width: "100%", height: "160px" }}
                  />
                  <div className="card-body">
                    <h6 className="card-title cursor-pointer">{product.product_title}</h6>
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: product.description }}></p>
                    <div className="clearfix">
                      <p className="mb-0 float-start">
                        <strong>{product.quantity}</strong> in stock
                      </p>
                      <p className="mb-0 float-end fw-bold">${product.price}</p>
                    </div>
                    <div className="d-flex align-items-center mt-3 fs-6">
                      <div className="cursor-pointer">
                        <i className="bx bxs-star text-warning"></i>
                        <i className="bx bxs-star text-warning"></i>
                        <i className="bx bxs-star text-warning"></i>
                        <i className="bx bxs-star text-warning"></i>
                        <i className="bx bxs-star text-secondary"></i>
                      </div>
                      <p className="mb-0 ms-auto">4.2 (182)</p>
                    </div>

                    <div className="btns">
                     <a href="/update-products"> <button className="prodEditBtn my-4">Edit</button></a>

                      {/* Ant Design Popconfirm for deletion */}
                      <Popconfirm
                        title="Are you sure to delete this product?"
                        onConfirm={() => deleteProduct(product._id)}
                        onCancel={() => message.info("Delete action cancelled")}
                        okText="Yes"
                        cancelText="No"
                      >
                        <button className="prodDelBtn">Delete</button>
                      </Popconfirm>
                    </div>
                  </div>
                </div>
              </div>
            ))):(<p className="mx-auto">No Products Available</p>) }
          </div>
        </div>
      </div>
      <SellerFooter />
    </>
  );
};

export default ViewProducts;
