import SellerFooter from "../../../../components/seller/SellerFooter";
import SellerHeader from "../../../../components/seller/SellerHeader";
import { useEffect, useState } from "react";
import {
  collectCategories,
  deleteRequestCategory,
} from "../../../../utils/seller/sellerAPI";
import { Button, Popconfirm } from "antd";
import { toast, ToastContainer } from "react-toastify";

const ViewCategory = () => {
  const confirmDelete = async (id) => {
    const result = await deleteRequestCategory(id);
    toast[result.icon](result.title);
    if (result.status) {
      document.getElementById(id).style.display = "none";
    }
  };

  const [category, setCategory] = useState([]);

  useEffect(async () => {
    const result = await collectCategories();
    setCategory(result);
  }, [0]);
  let no = 1;

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    // Get day, month, and year
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getUTCFullYear();
    // Format date as d/M/Y
    return `${day}/${month}/${year}`;
  };

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
                    href="/seller/request-category"
                    className="btn btn-sm btn-primary mt-2 mt-lg-0"
                  >
                    <i className="bx bxs-plus-square" />
                    Request to add
                  </a>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table mb-0" id="myTable">
                  <thead className="table-light">
                    <tr>
                      <th>No</th>
                      <th>Category Name</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.length > 0 ? (
                      category.map((item) => (
                        <tr id={item._id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div>{no++}</div>
                              <div className="ms-2">
                                <h6 className="mb-0 font-14"></h6>
                              </div>
                            </div>
                          </td>
                          <td>{item.request_category_name}</td>
                          <td>{formatDate(item.createdAt)}</td>
                          <td>
                            <div className="d-flex order-actions">
                              <a
                                href="{{ route('seller.edit-category.sellerCategoryEdit',$category->category_id ) }}"
                                className=""
                              >
                                <i className="bx bxs-edit" />
                              </a>
                              <Popconfirm
                                title="Delete Category Request ?"
                                description="Removes a category from the request"
                                onConfirm={() => {
                                  confirmDelete(item._id);
                                }}
                              >
                                <a
                                  href="javascript:;"
                                  className="ms-3"
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  <i className="bx bxs-trash" />
                                </a>
                              </Popconfirm>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          style={{ color: "red", textAlign: "center" }}
                        >
                          Requested Category Not Found !
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <SellerFooter />
    </>
  );
};
export default ViewCategory;
