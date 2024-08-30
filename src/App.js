import Dashboard from "./pages/seller/Dashboard/Dashboard";
import AddCategory from "./pages/seller/Dashboard/Category/AddCategory";
import ViewCategory from "./pages/seller/Dashboard/Category/ViewCategory";
import AddProduct from "./pages/seller/Dashboard/Product/AddProduct";
import ViewProducts from "./pages/seller/Dashboard/Product/ViewProducts";
import Login from "./pages/seller/Login";
import Signup from "./pages/seller/Signup";
import UpdateCredential from "./pages/seller/Dashboard/Credential/UpdateCredential";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/seller/login" element={<Login />} />
          <Route path="/seller/signup" element={<Signup />} />
          <Route path="/seller/dashboard" element={<Dashboard />} />
          <Route
            path="/seller/change-credential"
            element={<UpdateCredential />}
          />
          <Route path="/request-category" element={<AddCategory />} />
          <Route path="/view-category" element={<ViewCategory />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/view-products" element={<ViewProducts />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
