import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// SELLER
import Dashboard from "./pages/seller/Dashboard/Dashboard";
import AddCategory from "./pages/seller/Dashboard/Category/AddCategory";
import ViewCategory from "./pages/seller/Dashboard/Category/ViewCategory";
import AddProduct from "./pages/seller/Dashboard/Product/AddProduct";
import ViewProducts from "./pages/seller/Dashboard/Product/ViewProducts";
import Login from "./pages/seller/Login";
import Signup from "./pages/seller/Signup";
import UpdateCredential from "./pages/seller/Dashboard/Credential/UpdateCredential";
import "react-toastify/dist/ReactToastify.css";

// ADMIN
import AdminLoginPage from "./pages/admin/Login.jsx";
import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard";
import AdminAddCategory from "./pages/admin/Dashboard/AdminCategory/AdminAddCategory";
import AdminViewCategory from "./pages/admin/Dashboard/AdminCategory/AdminViewCategory";
import AdminAddProduct from "./pages/admin/Dashboard/AdminProduct/AdminAddProduct";

import AdminUpdateProduct from "./pages/admin/Dashboard/AdminProduct/AdminUpdateProduct.jsx";

import AdminViewProducts from "./pages/admin/Dashboard/AdminProduct/AdminViewProducts";
import AdminManageOrder from "./pages/admin/Dashboard/AdminManageOrder";
import AdminAddSeller from "./pages/admin/Dashboard/AdminAddSeller";
import AdminViewSeller from "./pages/admin/Dashboard/AdminViewSeller";
import AdminRefund from "./pages/admin/Dashboard/AdminRefund.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AddBlog from "../src/pages/admin/Dashboard/Blog/AddBlog.jsx";

import AdminRequestCategories from "./pages/admin/Dashboard/AdminRequestCategories.jsx";
import UpdateProducts from "./pages/seller/Dashboard/Product/UpdateProducts.jsx";
import AdminUpdateProducts from "./pages/admin/Dashboard/AdminProduct/AdminUpdateProduct.jsx";
import NotFoundPage from "./pages/admin/NotFoundPage.jsx";
import ViewBlog from "./pages/admin/Dashboard/Blog/ViewBlog.jsx";
import EdtiBlog from "../src/pages/admin/Dashboard/Blog/editBlog.jsx";
import ViewSingleBlog from "./pages/admin/Dashboard/Blog/ViewSingleBlog.jsx";
import EditCategory from "./pages/admin/Dashboard/AdminCategory/EditCategory.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/seller/login" element={<Login />} />
        <Route path="/seller/signup" element={<Signup />} />
        <Route path="/seller/dashboard" element={<Dashboard />} />
        <Route
          path="/seller/change-credential"
          element={<UpdateCredential />}
        />
        <Route path="/seller/request-category" element={<AddCategory />} />
        <Route path="/seller/view-category" element={<ViewCategory />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/view-products" element={<ViewProducts />} />

        <Route path="/update-products/:id" element={<UpdateProducts />} />

        {/* ADMIN ROUTES  */}

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin-add-category" element={<AdminAddCategory />} />
        <Route path="/admin-view-category" element={<AdminViewCategory />} />
        <Route path="/admin-add-product" element={<AdminAddProduct />} />
        <Route path="/admin-view-products" element={<AdminViewProducts />} />
        <Route path="/admin-manage-orders" element={<AdminManageOrder />} />
        <Route path="/admin-add-seller" element={<AdminAddSeller />} />
        <Route path="/admin-view-seller" element={<AdminViewSeller />} />
        <Route path="/admin-refund" element={<AdminRefund />} />

        <Route
          path="/admin-update-products/:id"
          element={<AdminUpdateProducts />}
        />

        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/admin-request-category"
          element={<AdminRequestCategories />}
        />
        <Route path="/admin/add-blog" element={<AddBlog />} />
        <Route path="/admin/view-blogs" element={<ViewBlog />} />
        <Route path="/admin/edit-blog/:id" element={<EdtiBlog />} />
        <Route path="/admin/view-blog/:id" element={<ViewSingleBlog />} />
        <Route path="/admin/edit-category/:id" element={<EditCategory />} />
      </Routes>
    </>
  );
}

export default App;
