const express = require("express");
const tool = require("../models/Tool");

const router = express.Router();

router.get("/", async (req, res) => {
    const tools = await Tool.find();
    res.json(tools);
});

router.post("/", async (req, res) => {
    const { name, image, description, price } = req.body;
    const newTool = new Tool({ name, image, description, price });
    await newTool.save();
    res.json({ message: "Tool added successfully" });
});

module.exports = router;
