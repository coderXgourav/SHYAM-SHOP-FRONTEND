import { useState } from "react";
import SellerFooter from "../../../../components/seller/SellerFooter";
import SellerHeader from "../../../../components/seller/SellerHeader";
import { ToastContainer, toast } from "react-toastify";
import { addRequestCategory } from "../../../../utils/seller/sellerAPI";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [btnStatus, setBtnStatus] = useState(false);

  const categoryFormSubmit = async (event) => {
    event.preventDefault();
    setBtnStatus(false);
    if (!category) {
      setBtnStatus(false);
      return toast["error"]("Please Fill Input Fields");
    } else {
      const data = { category };
      const result = await addRequestCategory(data);
      toast[result.icon](result.title);
      if (result.status) {
        setCategory("");
        setBtnStatus(false);
      }
    }
  };

  return (
    <>
      <SellerHeader />
      <div className="page-wrapper">
        <div className="page-content">
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
                    Request to Add Category
                  </li>
                </ol>
              </nav>
            </div>
            <div className="ms-auto">
              <div className="btn-group">
                <a href="{{route('seller.viewCategoryPage')}}">
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
              <form onSubmit={categoryFormSubmit}>
                <div className="card">
                  <div className="card-header">
                    <h4 className="my-4 text-center text-primary">
                      Request to Add Category
                    </h4>
                  </div>
                  <div className="card-body">
                    <br />
                    <input
                      className="form-control"
                      id="category_name"
                      type="text"
                      placeholder="Type Category Name"
                      required=""
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    <br />
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
                      disabled={btnStatus}
                      value={"Request to add category"}
                    />
                  </div>
                  <br />
                </div>
              </form>
            </div>
          </div>
          {/*end row*/}
        </div>
        <ToastContainer />
      </div>
      <SellerFooter />
    </>
  );
};
export default AddCategory;
