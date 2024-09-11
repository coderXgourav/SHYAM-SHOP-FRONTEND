import AdminHeader from "../../../../components/admin/AdminHeader";
import AdminFooter from "../../../../components/admin/AdminFooter";
import { useEffect, useState, useRef } from "react";
import Quill from "quill";
import { toast, ToastContainer } from "react-toastify";
import { blogUpload } from "../../../../utils/admin/adminAPI";

const AddBlog = () => {
  const [blogTopic, setBlogTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [btnStatus, setBtnStatus] = useState(false);

  const imageChange = (event) => {
    const image = event.target.files[0];
    setImage(image);
    setPreview(URL.createObjectURL(image));
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
  }, [0]);

  const blogSubmit = async (event) => {
    setBtnStatus(true);

    event.preventDefault();
    if (!blogTopic || !subTopic || !title || !subTitle) {
      toast["error"]("Fill all the fields");
      setTimeout(() => {
        setBtnStatus(false);
      }, 3000);
    } else {
      const data = { blogTopic, subTopic, title, subTitle, desc, image };
      const result = await blogUpload(data);
      console.log(result);

      setBtnStatus(false);
      toast[result.icon](result.title);
      if (result.status) {
        setBlogTopic("");
        setSubTopic("");
        setTitle("");
        setSubTitle("");
        setPreview("");
        setBtnStatus("");
      }
    }
  };

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
                    Post New Blog
                  </li>
                </ol>
              </nav>
            </div>
            <div className="ms-auto">
              <div className="btn-group">
                <a href="/admin/view-blogs">
                  <button type="button" className="btn-sm btn btn-primary">
                    View Blogs
                  </button>
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={blogSubmit}>
            <div className="card">
              <div className="card-body p-4">
                <h5 className="card-title">Post Blog</h5>
                <hr />
                <div className="form-body mt-4">
                  <div className="row">
                    <div className="border col-lg-10 mx-auto">
                      <div className=" p-4 rounded">
                        <div className="mb-3">
                          <label
                            htmlFor="inputSellerName"
                            className="form-label"
                          >
                            Blog Topic
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputSellerName"
                            placeholder="Type Blog Topic"
                            onChange={(e) => {
                              setBlogTopic(e.target.value);
                            }}
                            value={blogTopic}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="inputSellerEmail"
                            className="form-label"
                          >
                            Blog Sub Topic
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputSellerEmail"
                            placeholder="Type Sub Topic"
                            onChange={(e) => {
                              setSubTopic(e.target.value);
                            }}
                            value={subTopic}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="inputSellerPhone"
                            className="form-label"
                          >
                            Blog Title
                          </label>
                          <textarea
                            className="form-control"
                            id=""
                            placeholder="Type Blog Title"
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
                            value={title}
                          ></textarea>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="inputSellerAddress"
                            className="form-label"
                          >
                            Blog Subtitle
                          </label>
                          <textarea
                            name=""
                            className="form-control"
                            placeholder="Type Blog Sub Title"
                            id=""
                            rows={5}
                            onChange={(e) => {
                              setSubTitle(e.target.value);
                            }}
                            value={subTitle}
                          ></textarea>
                        </div>
                        <label htmlFor="inputSellerProfilePicture">
                          Blog Image
                        </label>
                        <div className="mt-2 border border-3 rounded p-4">
                          <input
                            type="file"
                            name="blogImage"
                            accept="image/*"
                            style={{ marginBottom: "10px" }}
                            onChange={imageChange}
                          />
                          <div>
                            {preview ? (
                              <img src={preview} width={"400px"} />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="mt-3">
                          <label htmlFor>Description</label>
                          <div
                            ref={editorRef}
                            id="editor-container"
                            style={{ height: "200px" }}
                          ></div>
                        </div>
                        <br />
                        <button
                          type="submit"
                          className="btn btn-primary"
                          id="submitBtn"
                          disabled={btnStatus}
                        >
                          Post Blog
                        </button>
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
      <AdminFooter />
    </>
  );
};

export default AddBlog;
