const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const toolRoutes = require("./routes/toolRoutes");
const cartRoutes = require("./routes/cartRoutes");

dotenv.config();
connectDB();

const app = express();

// ✅ Enable CORS for All Requests

app.use(cors({
     origin: "http://localhost:3000", // Allow requests from frontend
    
 }));

app.use(express.json());

// ✅ Handle Preflight Requests (Important for CORS)
app.options("*", cors());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tools", toolRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
