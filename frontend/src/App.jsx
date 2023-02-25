import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Cart from "./pages/cart/cart";
import Checkout from "./pages/checkout/checkout";
import Home from "./pages/home/home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
