import SellerHeader from "./components/seller/SellerHeader";
import SellerFooter from "./components/seller/SellerFooter";
import Dashboard from "./pages/seller/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <SellerHeader />
        <Routes>
          <Route path="/seller/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<></>} />
        </Routes>
        <SellerFooter />
      </Router>
    </>
  );
}

export default App;
