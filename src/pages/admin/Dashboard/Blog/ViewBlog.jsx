import { useEffect, useState } from "react";
import AdminFooter from "../../../../components/admin/AdminFooter";
import AdminHeader from "../../../../components/admin/AdminHeader";
import { getBlogs, callDeleteBlog } from "../../../../utils/admin/adminAPI";
import { Button, Modal } from "antd";
import { toast, ToastContainer } from "react-toastify";

const ViewBlog = () => {
  const [blogs, setBlogs] = useState([]);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Are you sure to delete the blog ?"
  );

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async (id) => {
    setModalText("Are you sure to delete the blog ?");
    setConfirmLoading(true);
    const result = await callDeleteBlog(id);
    toast[result.icon](result.title);

    if (result.status) {
      document.getElementById(id).style.display = "none";
    }

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const confirm = () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(null), 3000);
    });

  useEffect(async () => {
    const blogs = await getBlogs();
    setBlogs(blogs);
  }, [0]);
  return (
    <>
      <AdminHeader />
      <div className="wrapper">
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
                      Blogs
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="ms-auto">
                <div className="btn-group">
                  <a href="/admin/add-blog">
                    <button type="button" className="btn btn-primary btn-sm">
                      Post New Blog
                    </button>
                  </a>
                </div>
              </div>
            </div>
            {/*end breadcrumb*/}
            {/* Section: Pricing table */}
            <div className="pricing-table">
              <hr />
              <div
                className="row row-cols-1 row-cols-lg-3"
                style={{ justifyContent: "center" }}
              >
                {/* Plus Tier */}
                {blogs.length > 0 ? (
                  blogs.map((item) => (
                    <div className="col" key={item._id} id={item._id}>
                      <div className="card mb-5 mb-lg-0">
                        <div className="card-header bg-primary py-3">
                          <img
                            src={`${process.env.REACT_APP_API_URL}/uploads/${item.blog_image}`}
                            alt=""
                            style={{ width: "100%", height: "200px" }}
                          />
                        </div>

                        <div className="card-body p-3">
                          <h6 className="">{item.blog_title}</h6>
                          <div className="d-flex justify-content-center">
                            <a
                              href={"/admin/edit-blog/" + item._id}
                              className="btn btn-success my-2 radius-30"
                            >
                              Edit Blog
                            </a>{" "}
                            &nbsp;
                            <Modal
                              title="Title"
                              open={open}
                              onOk={() => {
                                handleOk(item._id);
                              }}
                              confirmLoading={confirmLoading}
                              onCancel={handleCancel}
                            >
                              <p>{modalText}</p>
                            </Modal>
                            <a
                              className="btn btn-danger my-2 radius-30"
                              onClick={() => showModal()}
                            >
                              Delete Blog
                            </a>
                          </div>
                          <div className="d-grid">
                            <a
                              href={"/admin/view-blog/" + item._id}
                              className="btn btn-primary my-2 radius-30"
                            >
                              View Blog
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <h4 style={{ color: "red " }}>Blogs Not Found</h4>
                  </div>
                )}
              </div>
              {/*end row*/}
            </div>
            {/* Section: Pricing table */}
          </div>
        </div>
        {/*end page wrapper */}
        {/*start overlay*/}
        <div className="overlay toggle-icon" />
        {/*end overlay*/}
        {/*Start Back To Top Button*/}{" "}
        <a href="javaScript:;" className="back-to-top">
          <i className="bx bxs-up-arrow-alt" />
        </a>
        {/*End Back To Top Button*/}
        <footer className="page-footer">
          <p className="mb-0">Copyright © 2024. All right reserved.</p>
        </footer>
      </div>

      <ToastContainer />
      <AdminFooter />
    </>
  );
};

export default ViewBlog;
