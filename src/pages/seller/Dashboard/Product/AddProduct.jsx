import SellerFooter from "../../../../components/seller/SellerFooter";
import SellerHeader from "../../../../components/seller/SellerHeader";

const AddProduct = () => {
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

          <form action id="formSubmit">
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
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor>Description</label>
                          <div>
                            <textarea
                              id="mytextarea"
                              name="mytextarea"
                              placeholder="Type product description"
                              required
                              defaultValue={""}
                            />
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
                            id="imageInput"
                            multiple
                            accept="image/*"
                            name="image[]"
                            required
                          />
                        </div>
                        <div id="imageContainer" />
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
                            >
                              <option value="{{$item->category_id}}">
                                Category
                              </option>
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
      <SellerFooter />
    </>
  );
};

export default AddProduct;
