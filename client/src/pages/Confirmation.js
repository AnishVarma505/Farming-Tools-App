import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Confirmation.css";

const Confirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { orderDetails } = location.state || {};

    if (!orderDetails) {
        return (
            <div className="confirmation-container">
                <h2>Order Not Found</h2>
                <p>No order details available.</p>
                <button onClick={() => navigate("/tools")}>Browse Tools</button>
            </div>
        );
    }

    const {
        orderId,
        cartItems = [], // ✅ Default empty array if undefined
        totalAmount,
        paymentMethod,
    } = orderDetails;

    const handlePrint = () => {
        window.print(); // ✅ Opens the print dialog
    };

    return (
        <div className="confirmation-container">
            <h2>Order Confirmation</h2>
            <p>Thank you for your purchase!</p>

            <div className="receipt">
                <h3>🧾 Receipt</h3>
                <p><strong>Order ID:</strong> {orderId}</p>
                <p><strong>Payment Method:</strong> {paymentMethod}</p>
                <p><strong>Total Paid:</strong> ₹{totalAmount}</p>

                <h3>🛍 Items Purchased:</h3>
                {cartItems.length > 0 ? (
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                <strong>{item.name}</strong> - ₹{item.price || item.rentPrice} 
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No items found in the order.</p>
                )}
            </div>

            <button className="print-btn" onClick={handlePrint}>🖨 Print Receipt</button>
            <button className="tools-btn" onClick={() => navigate("/tools")}>🔧 Browse Tools</button>
        </div>
    );
};

export default Confirmation;
