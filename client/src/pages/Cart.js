import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [rentalDurations, setRentalDurations] = useState({});
  const [checkoutOption, setCheckoutOption] = useState(null);
  const [showCheckoutOptions, setShowCheckoutOptions] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [pickupSameAsDelivery, setPickupSameAsDelivery] = useState(true);
  const [pickupAddress, setPickupAddress] = useState("");

  useEffect(() => {
    const initialDurations = {};
    cartItems.forEach((item) => {
      if (item.type === "rent") {
        initialDurations[item.id] = 1; // Default to 1 week rental
      }
    });
    setRentalDurations(initialDurations);
  }, [cartItems]);

  const handleWeeksChange = (itemId, weeks) => {
    setRentalDurations((prev) => ({ ...prev, [itemId]: weeks }));
  };

  const calculateReturnDate = (weeks) => {
    if (!weeks || isNaN(weeks) || weeks < 1) return "Invalid date";
    const start = new Date();
    start.setDate(start.getDate() + weeks * 7);
    return start.toISOString().split("T")[0];
  };

  const totalCost = cartItems.reduce((total, item) => {
    if (item.type === "buy") {
      return total + item.price;
    } else if (item.type === "rent") {
      return total + item.rentPrice * (rentalDurations[item.id] || 1);
    }
    return total;
  }, 0);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = (option) => {
    setCheckoutOption(option);
  };

  const handleProceedToPayment = () => {
    navigate("/payment", {
      state: {
        deliveryAddress,
        pickupAddress: pickupSameAsDelivery ? deliveryAddress : pickupAddress,
        totalAmount: totalCost,
      }
    });
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-image" />
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>

                {item.type === "buy" ? (
                  <p><strong>Price: </strong>₹{item.price}</p>
                ) : (
                  <>
                    <p><strong>Weekly Rent:</strong> ₹{item.rentPrice}</p>
                    <label>Weeks to Rent: </label>
                    <input
                      type="number"
                      min="1"
                      value={rentalDurations[item.id] || 1}
                      onChange={(e) => handleWeeksChange(item.id, parseInt(e.target.value) || 1)}
                    />
                    <p><strong>Total Rent Cost:</strong> ₹{item.rentPrice * (rentalDurations[item.id] || 1)}</p>
                    <p><strong>Start Date:</strong> {new Date().toISOString().split("T")[0]}</p>
                    <p><strong>Return Date:</strong> {calculateReturnDate(rentalDurations[item.id] || 1)}</p>
                  </>
                )}

                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}

          <h3>Total Amount: ₹{totalCost}</h3>
          <button onClick={() => setShowCheckoutOptions(true)}>Proceed to Checkout</button>

          {showCheckoutOptions && (
            <div className="checkout-options">
              <h4>Select Checkout Option</h4>
              <button onClick={() => handleCheckout("Delivery")}>Delivery</button>
              <button onClick={() => handleCheckout("Pick-Up")}>Pick-Up</button>
            </div>
          )}

          {checkoutOption === "Delivery" && (
            <div className="delivery-form">
              <h4>Enter Delivery Address</h4>
              <textarea
                placeholder="Enter delivery address..."
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />

              <label>
                <input
                  type="checkbox"
                  checked={pickupSameAsDelivery}
                  onChange={() => setPickupSameAsDelivery(!pickupSameAsDelivery)}
                />
                Pickup from the same address
              </label>

              {!pickupSameAsDelivery && (
                <textarea
                  placeholder="Enter different pickup address..."
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                />
              )}

              <button onClick={handleProceedToPayment} disabled={!deliveryAddress}>
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
      )}

      <button className="back-btn" onClick={() => navigate("/tools")}>Back to Tools</button>
    </div>
  );
};

export default Cart;
