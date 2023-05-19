import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import ProductDetalji from "./components/Product/ProductDetalji";
import IzmjeniProduct from "./components/Product/IzmjeniProduct";
import NoviProduct from "./components/Product/NoviProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetalji />} />
        <Route path="/product/edit/:id" element={<IzmjeniProduct />} />
        <Route path="/product/add" element={<NoviProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;