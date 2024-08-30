import SellerFooter from "../../../../components/seller/SellerFooter";
import SellerHeader from "../../../../components/seller/SellerHeader";
import React, { useEffect } from "react";
import Quill from "quill";
import { useState } from "react";
import AdminHeader from "../../../../components/admin/AdminHeader";
import AdminFooter from "../../../../components/admin/AdminFooter";

const AdminAddProduct = () => {
  const [images, setImages] = useState([]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const productAddHandler = async (event) => {
    event.preventDefault();
    if (!title || !price || !quantity || !category) {
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));

    setImages((prevImages) => [...prevImages, ...imagePreviews]);

    // Clean up object URLs to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file));
  };

  // Handle image removal
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  useEffect(() => {
    new Quill("#editor-container", {
      theme: "snow",
    });
  }, []);
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
                    Add Product
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

          <form id="formSubmit" onSubmit={productAddHandler}>
            <input type="hidden" id="url" defaultValue="/seller/add-product" />
            <input type="hidden" id="dataType" defaultValue="POST" />
            <div className="card">
              <div className="card-body p-4">
                <h5 className="card-title">Add New Product</h5>
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
                            required
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
                            value={title}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor>Description</label>
                          <div>
                            <div
                              id="editor-container"
                              style={{ height: "200px" }}
                            ></div>
                          </div>
                        </div>

                        <label htmlFor>
                          Choose Product images{" "}
                          <span className="text text-primary text-sm">
                            ( Select up to 4 Images )
                          </span>{" "}
                        </label>
                        <div className="mb-3 border border-3  rounded p-4">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ marginBottom: "10px" }}
                            required={true}
                          />
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {images.map((image, index) => (
                            <div
                              key={index}
                              style={{ position: "relative", margin: "5px" }}
                            >
                              <img
                                src={image}
                                alt={`Preview ${index}`}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  objectFit: "cover",
                                }}
                              />
                              <button
                                onClick={() => handleRemoveImage(index)}
                                style={{
                                  position: "absolute",
                                  top: "0",
                                  right: "0",
                                  backgroundColor: "red",
                                  color: "white",
                                  border: "none",
                                  cursor: "pointer",
                                  borderRadius: "0 0 0 5px",
                                  padding: "5px",
                                }}
                              >
                                X
                              </button>
                            </div>
                          ))}
                        </div>
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
                              id="inputStarPoints"
                              placeholder="Product Price "
                              name="quantity"
                              required
                              onChange={(e) => {
                                setPrice(e.target.value);
                              }}
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
                              placeholder="Quantity of products in stock "
                              name="quantity"
                              required
                              onChange={(e) => {
                                setQuantity(e.target.value);
                              }}
                              value={quantity}
                            />
                          </div>
                          <div className="col-12">
                            <label
                              htmlFor="inputProductType"
                              className="form-label"
                            >
                              Product Type
                            </label>
                            <select
                              className="form-select"
                              id="inputProductType"
                              required
                              name="category"
                              onChange={(e) => {
                                setCategory(e.target.value);
                              }}
                              value={category}
                            >
                              <option value="{{$item->category_id}}">
                                Category
                              </option>
                              <option value="1">test</option>
                            </select>
                          </div>

                          <div className="col-12">
                            <div className="d-grid mt-3">
                              <button
                                type="submit"
                                className="btn btn-primary"
                                id="submitBtn"
                              >
                                Save Product
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
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default AdminAddProduct;
