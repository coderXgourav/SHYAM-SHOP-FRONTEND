import AdminFooter from "../../../../components/admin/AdminFooter";
import AdminHeader from "../../../../components/admin/AdminHeader";
import SellerFooter from "../../../../components/seller/SellerFooter";
import SellerHeader from "../../../../components/seller/SellerHeader";
const AdminAddCategory = () => {
  return (
    <>
      <AdminHeader />
      <div className="page-wrapper">
        <div className="page-content">
          {/*breadcrumb*/}
          <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div className="breadcrumb-title pe-3">Forms</div>
            <div className="ps-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="javascript:;">
                      <i className="bx bx-home-alt" />
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Add Category
                  </li>
                </ol>
              </nav>
            </div>
            <div className="ms-auto">
              <div className="btn-group">
                <a href="{{route('seller.viewCategoryPage')}}">
                  {" "}
                  <button type="button" className="btn btn-sm btn-primary">
                    View Category
                  </button>
                </a>
              </div>
            </div>
          </div>
          {/*end breadcrumb*/}
          <div className="row">
            <div className="col-xl-9 mx-auto">
              <form id="formSubmit">
                <input
                  type="hidden"
                  id="url"
                  defaultValue="/seller/add-category"
                />
                <input type="hidden" id="dataType" defaultValue="POST" />
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="LcoydqmIVeeSsJm2SfgstfFVDOZO97lrPPt02Efn"
                />
                <div className="card">
                  <div className="card-header">
                    <h4 className="my-4 text-center text-primary">
                      Add Category{" "}
                    </h4>
                  </div>
                  <div className="card-body">
                    {" "}
                    <br />
                    <input
                      className="form-control"
                      id="category_name"
                      type="text"
                      placeholder="Type Category Name"
                      required=""
                      name="category_name"
                    />{" "}
                    <br />
                    <div>
                      <input
                        className="form-control"
                        type="file"
                        placeholder="Type Category Name"
                        required=""
                        name="category_photo"
                        id="imageInput"
                      />{" "}
                      <br />
                      <div id="imagePreview" />
                    </div>
                  </div>
                  <br />
                  <div className="card-footer text-center">
                    {" "}
                    <br />
                    <input
                      type="submit"
                      id="submitBtn"
                      defaultValue="Add Category"
                      className="btn btn-primary "
                      value={"Add category"}
                    />
                    <button
                      className="btn btn-primary"
                      type="button"
                      disabled=""
                      id="loadingBtn"
                      style={{ display: "none", width: 136 }}
                    >
                      {" "}
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Loading...</span>
                    </button>
                  </div>
                  <br />
                </div>
              </form>
            </div>
          </div>
          {/*end row*/}
        </div>
      </div>
      <AdminFooter />
    </>
  );
};
export default AdminAddCategory;
