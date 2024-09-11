import { useEffect, useState } from "react";
import AdminFooter from "../../../../components/admin/AdminFooter";
import AdminHeader from "../../../../components/admin/AdminHeader";
import { useParams } from "react-router-dom";
import { getBlogData } from "../../../../utils/admin/adminAPI";

const ViewSingleBlog = () => {
  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");

  const { id } = useParams();
  useEffect(async () => {
    const result = await getBlogData(id);
    setTopic(result.blog_topic);
    setSubTopic(result.topic_description);
    setTitle(result.blog_title);
    setSubtitle(result.blog_sub_title);
    setImage(result.blog_image);
    setDesc(result.blog_description);
    console.log(result);
  }, [0]);

  return (
    <>
      <AdminHeader />
      <div className="wrapper">
        {/*start page wrapper */}
        <div className="page-wrapper">
          <div className="page-content">
            <div className="card">
              <div className="card-body">
                <div className="row"></div>
                {/*end row*/}
                <div className="border rounded-4 text-center p-4 mb-4">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/uploads/${image}`}
                  />
                  <hr />
                  <h5>{topic}</h5>
                  <h6>{subTopic}</h6>
                  <div id="editor">
                    <h4>{title}</h4>
                    <h5>{subTitle}</h5>
                  </div>
                  <div>{desc}</div>
                </div>
              </div>
            </div>
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
      <AdminFooter />
    </>
  );
};
export default ViewSingleBlog;
