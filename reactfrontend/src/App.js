import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import About from "./Pages/About";
import Product from "./Pages/Product";
import Protected from "./Components/Protected";
import Singleproduct from "./Components/Singleproduct";
import Category from "./Pages/Category";
import AllProduct from "./Pages/AllProduct";
import Contactus from "./Pages/Contactus";
import Productbycat from "./Pages/Productsbycat";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:product" element={<Singleproduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/category" element={<Category />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/category/:items" element={<Productbycat />} />
          <Route path="/cart" element={<Protected comp={Cart} />}/>
          <Route path="/about" element={<Protected comp={About} />}/>
          <Route path="/product" element={<Protected comp={Product} />} />
          <Route path="/checkout" element={<Protected comp={Checkout} />} />
        </Routes>
       
      </Router>
    </>
  );
}

export default App;
