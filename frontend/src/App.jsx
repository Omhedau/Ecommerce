import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Instagram from "./components/Instagram";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import OrderSummary from "./components/OrderSummary";
import Shop from "./pages/Shop";
import { Route, Routes } from "react-router-dom";
import Address from "./components/Address";
import Payment from "./components/Payment";
import OrderSuccess from "./components/OrderSuccess";
import OrderFail from "./components/OrderFail";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const jwt = localStorage.getItem("jwt");
  const savedAddress = sessionStorage.getItem("selectedAddress");
  console.log(savedAddress);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop/:gender/:toplevelCat/:category" element={<Shop />} />
        <Route path="/product/id/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/address" element={<Address />} />
        <Route path="/checkout/summary" element={<ProtectedRoute element={OrderSummary} condition={jwt && savedAddress} redirectTo="/"/>} />
        <Route path="/checkout/payment" element={<ProtectedRoute element={Payment} condition={jwt && savedAddress} redirectTo="/"/>} />
        <Route path="/order/success" element={<OrderSuccess />} />
        <Route path="/order/fail" element={<OrderFail />} />
        <Route path="/profile" element={<ProtectedRoute element={Profile} condition={jwt} redirectTo="/"/>} />
        </Routes>
      <div className="">
        <Instagram />
        <Footer />
      </div>
    </>
  );
}

export default App;
