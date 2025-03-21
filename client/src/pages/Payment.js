import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import "./Payment.css";

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();

    console.log("Location State:", location.state); // ✅ Debugging: Check if totalAmount & cartItems are received

    const totalAmount = location.state?.totalAmount || 0; // ✅ Ensure correct retrieval
    const cartItems = location.state?.cartItems || []; // ✅ Get cart items

    const [paymentMethod, setPaymentMethod] = useState("");
    const [upiId, setUpiId] = useState("");
    const [cardDetails, setCardDetails] = useState({
        cardHolder: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });
    const [netBankingBank, setNetBankingBank] = useState("");

    const handlePayment = () => {
        console.log("Cart Items in Payment Page:", location.state?.cartItems); 
        const orderDetails = {
            orderId: Math.floor(Math.random() * 1000000), // Generate a random order ID
            cartItems: cartItems,
            totalAmount: totalAmount,
            paymentMethod: paymentMethod,
        };

        alert(`Payment Successful! Total Amount Paid: ₹${totalAmount}`);
        navigate("/confirmation", { state: { orderDetails } }); // ✅ Pass order details
    };

    return (
        <div className="payment-container">
            <p className="total-amount">Total Amount: ₹{totalAmount}</p>  {/* ✅ Total Amount Displayed Correctly */}
            <h2>Payment Options</h2>

            <div className="payment-methods">
                <label>
                    <input type="radio" name="payment" value="UPI" onChange={() => setPaymentMethod("UPI")} />
                    UPI
                </label>
                <label>
                    <input type="radio" name="payment" value="COD" onChange={() => setPaymentMethod("COD")} />
                    Cash on Delivery
                </label>
                <label>
                    <input type="radio" name="payment" value="Card" onChange={() => setPaymentMethod("Card")} />
                    Credit/Debit Card
                </label>
                <label>
                    <input type="radio" name="payment" value="Net Banking" onChange={() => setPaymentMethod("Net Banking")} />
                    Net Banking
                </label>
            </div>

            {paymentMethod === "UPI" && (
                <div className="upi-payment">
                    <h3>Scan to Pay</h3>
                    <QRCodeCanvas value={`upi://pay?pa=your-upi-id@upi&pn=Your Name&am=${totalAmount}&cu=INR`} />
                    <p>Or enter UPI ID manually:</p>
                    <input type="text" placeholder="Enter UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                </div>
            )}

            {paymentMethod === "Card" && (
                <div className="card-payment">
                    <input type="text" placeholder="Card Holder Name" value={cardDetails.cardHolder}
                        onChange={(e) => setCardDetails({ ...cardDetails, cardHolder: e.target.value })} />
                    <input type="text" placeholder="Card Number" maxLength="16" value={cardDetails.cardNumber}
                        onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })} />
                    <input type="text" placeholder="MM/YY" maxLength="5" value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
                    <input type="password" placeholder="CVV" maxLength="3" value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
                </div>
            )}

            {paymentMethod === "Net Banking" && (
                <div className="net-banking">
                    <select value={netBankingBank} onChange={(e) => setNetBankingBank(e.target.value)}>
                        <option value="">Select Bank</option>
                        <option value="SBI">State Bank of India</option>
                        <option value="HDFC">HDFC Bank</option>
                        <option value="ICICI">ICICI Bank</option>
                        <option value="Axis">Axis Bank</option>
                    </select>
                </div>
            )}

            <button onClick={handlePayment} disabled={!paymentMethod}>
                Proceed to Pay
            </button>
        </div>
    );
};

export default Payment;
