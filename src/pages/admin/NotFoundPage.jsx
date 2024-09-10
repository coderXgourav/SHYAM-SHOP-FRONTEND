import AdminHeader from "../../components/admin/AdminHeader";
import AdminFooter from "../../components/admin/AdminFooter";

const NotFoundPage = () => {
  return (
    <>
      <AdminHeader />
      <>
        {/* wrapper */}
        <div className="wrapper">
          <div className="error-404 d-flex align-items-center justify-content-center">
            <div className="card shadow-none bg-transparent">
              <div className="card-body text-center">
                <h1 className="display-4 mt-5">We are Coming Soon 🚀</h1>
                <p>
                  We are currently working hard on this page.
                  <br />
                </p>
                <div className="row">
                  <div className="col-12 col-lg-12 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end wrapper */}
        {/* Bootstrap JS */}
      </>

      <AdminFooter />
    </>
  );
};

export default NotFoundPage;
