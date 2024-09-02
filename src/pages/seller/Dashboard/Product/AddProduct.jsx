import { toast, ToastContainer } from "react-toastify";
import SellerFooter from "../../../../components/seller/SellerFooter";
import SellerHeader from "../../../../components/seller/SellerHeader";
import { sellerAddProduct } from "../../../../utils/seller/sellerAPI";
import Quill from "quill";
import React, { useEffect, useRef, useState } from "react";

const AddProduct = () => {
  const [btnStatus, setBtnStatus] = useState(false);
  const [selectedFile, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  // const [img, setImg] = useState([]);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

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

    if (!title || !price || !quantity || !category || !desc) {
      setBtnStatus(false);
      return toast["error"]("Please Fill input fields");
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("category", category);
      formData.append("desc", desc);

      for (let file of selectedFile) {
        formData.append("image", file);
      }

      // const data = { title, price, quantity, category, desc, selectedFile };

      const response = await sellerAddProduct(formData);
      setBtnStatus(false);
      if (response.data.status) {
        setTitle("");
        setDesc("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setSelectedFiles([]);
      }
      return toast[response?.data?.icon](response?.data?.title);
    }
  };

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
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
                            value={title}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor>Description</label>
                          <div>
                            {/* <div
                              id="editor-container"
                              style={{ height: "200px" }}
                            ></div> */}
                            <div
                              ref={editorRef}
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
                                disabled={btnStatus}
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
      <ToastContainer />
      <SellerFooter />
    </>
  );
};

export default AddProduct;
