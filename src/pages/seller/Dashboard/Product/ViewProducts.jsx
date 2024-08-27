import SellerFooter from "../../../../components/seller/SellerFooter";
import SellerHeader from "../../../../components/seller/SellerHeader";

const ViewProducts = () => {
  return (
    <>
      <SellerHeader />
      <div class="page-wrapper">
        <div class="page-content">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-lg-3 col-xl-2">
                      <a
                        href="{{route('seller.addProductPage')}}"
                        className="btn btn-primary btn-sm mb-lg-0"
                      >
                        <i className="bx bxs-plus-square" />
                        New Product
                      </a>
                    </div>
                    <div className="col-lg-9 col-xl-10">
                      <form
                        action="{{route('seller.filterProduct')}}"
                        method="GET"
                        style={{ display: "flex" }}
                      >
                        <div className="row row-cols-lg-2 row-cols-xl-auto g-2">
                          <div className="col ">
                            <select
                              name="category"
                              id
                              className="form-control"
                              style={{ width: "200px" }}
                              required
                            >
                              <option value>Filter Category</option>

                              <option value="">Test</option>
                            </select>
                          </div>
                          <div className="col">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control ps-5"
                                placeholder="Search Product..."
                              />{" "}
                              <span className="position-absolute top-50 product-show translate-middle-y">
                                <i className="bx bx-search" />
                              </span>
                            </div>
                          </div>
                          <div className="col">
                            <select
                              name="price"
                              id
                              className="form-control"
                              style={{ width: "200px" }}
                            >
                              <option value>Price range</option>
                              <option value="low to high">Low to high</option>
                              <option value="High to low">High to low</option>
                            </select>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-sm mx-3"
                        >
                          Filter
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid">
            <div className="col">
              <div className="card">
                <img
                  src="/products/{{$imageName['0']}}"
                  className="card-img-top"
                  alt="..."
                  style={{ widows: "230px", height: "200px" }}
                />
                <div className="card-body">
                  <h6 className="card-title cursor-pointer">product title</h6>
                  <div className="clearfix">
                    <p className="mb-0 float-start">
                      <strong>12</strong> Quantity
                    </p>
                    <p className="mb-0 float-end fw-bold">
                      <span>$101</span>
                    </p>
                  </div>
                  <div className="d-flex  mt-3 fs-6 gap-2 justify-content-conter">
                    <a href="{{route('seller.editProduct',['id'=>$item->productId])}}">
                      {" "}
                      <button className="btn btn-primary btn-sm">Edit</button>
                    </a>
                    <button
                      className="btn btn-danger btn-sm"
                      onclick="confirmfunction({{$item->productId}},'/seller/delete-product')"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SellerFooter />
    </>
  );
};

export default ViewProducts;
