import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toolsData from "../data/Tools.json";
import "./Tools.css";

const Tools = ({ cartItems, setCartItems }) => {
  const [tools, setTools] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTools(toolsData);
  }, []);

  const addToCart = (tool, type, weeks = 1) => {
    const newCartItem = {
      ...tool,
      type,
      rentWeeks: type === "rent" ? weeks : 0,
      totalPrice: type === "buy" ? tool.price : tool.rentPrice * weeks,
      startDate: new Date().toISOString().split("T")[0],
      returnDate:
        type === "rent"
          ? new Date(
              new Date().setDate(new Date().getDate() + weeks * 7)
            ).toISOString().split("T")[0]
          : null,
    };

    setCartItems((prev) => [...prev, newCartItem]);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="tools-container">
      {/* Header with Logout & Cart */}
      <div className="header">
        <h2 className="page-title">Our Farming Tools</h2>
        <div className="buttons">
          <button className="cart-btn" onClick={() => navigate("/cart")}>
            🛒 Cart ({cartItems.length})
          </button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search tools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <p>Explore our collection of farming tools for purchase or rental.</p>

      {/* Tools List */}
      <div className="tools-list">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
            <div key={tool.id} className="tool-card">
              <img src={tool.image} alt={tool.name} />
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
              <p><strong>Price:</strong> ₹{tool.price}</p>
              <p><strong>Rent per week:</strong> ₹{tool.rentPrice}</p>

              <div className="button-group">
                <button className="buy-btn" onClick={() => addToCart(tool, "buy")}>
                  Buy
                </button>
                <button
                  className="rent-btn"
                  onClick={() => {
                    const weeks = prompt("Enter number of weeks:");
                    if (weeks && !isNaN(weeks) && weeks > 0) {
                      addToCart(tool, "rent", parseInt(weeks, 10));
                    } else {
                      alert("Please enter a valid number of weeks.");
                    }
                  }}
                >
                  Rent
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No tools found.</p>
        )}
      </div>
    </div>
  );
};

export default Tools;
