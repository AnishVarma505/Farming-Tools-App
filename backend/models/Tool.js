const mongoose = require("mongoose");

const ToolSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: Number
});

module.exports = mongoose.model("Tool", ToolSchema);
