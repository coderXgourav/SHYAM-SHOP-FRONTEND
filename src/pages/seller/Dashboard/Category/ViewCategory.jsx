import SellerFooter from "../../../../components/seller/SellerFooter";
import SellerHeader from "../../../../components/seller/SellerHeader";

const ViewCategory = () => {
  return (
    <>
      <SellerHeader />
      <div className="page-wrapper">
        <div className="page-content">
          {/*breadcrumb*/}
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
                    Categories
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          {/*end breadcrumb*/}
          <div className="card">
            <div className="card-body">
              <div className="d-lg-flex align-items-center mb-4 gap-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control ps-5 radius-30"
                    placeholder="Search category"
                  />
                  <span className="position-absolute top-50 product-show translate-middle-y">
                    <i className="bx bx-search" />
                  </span>
                </div>

                <div className="ms-auto">
                  <a
                    href="{{route('seller.addCategoryPage')}}"
                    className="btn btn-sm btn-primary mt-2 mt-lg-0"
                  >
                    <i className="bx bxs-plus-square" />
                    Add New Order
                  </a>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table mb-0" id="myTable">
                  <thead className="table-light">
                    <tr>
                      <th>No</th>
                      <th>Image</th>
                      <th>Category Name</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div>1</div>
                          <div className="ms-2">
                            <h6 className="mb-0 font-14"></h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <img
                          src="{{url('category')}}/{{$category->category_image}}"
                          alt="category_image"
                          className="img img-thumbnail"
                          width="50px"
                        />
                      </td>
                      <td>Category name</td>
                      <td>12-02-2024</td>
                      <td>
                        <div className="d-flex order-actions">
                          <a
                            href="{{ route('seller.edit-category.sellerCategoryEdit',$category->category_id ) }}"
                            className=""
                          >
                            <i className="bx bxs-edit" />
                          </a>
                          <a
                            href="javascript:;"
                            className="ms-3"
                            onclick="confirmfunction({{$category->category_id}},'/seller/delete-category')"
                          >
                            <i className="bx bxs-trash" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SellerFooter />
    </>
  );
};
export default ViewCategory;
