import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Tools from "./pages/Tools";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Home from "./pages/Home"; 
import Payment from "./pages/Payment"; 
import Confirmation from "./pages/Confirmation"; // ✅ Import Confirmation Page

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login setCartItems={setCartItems} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tools" element={<Tools cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/payment" element={<Payment cartItems={cartItems} />} />
        <Route path="/confirmation" element={<Confirmation />} /> {/* ✅ Add Route for Confirmation Page */}
      </Routes>
    </Router>
  );
};

export default App;
