const Tool = require("../models/Tool");

// Get All Tools
exports.getTools = async (req, res) => {
  try {
    const tools = await Tool.find();
    res.json(tools);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tools" });
  }
};

// Add New Tool
exports.addTool = async (req, res) => {
  try {
    const { name, image, description, price } = req.body;
    const newTool = new Tool({ name, image, description, price });
    await newTool.save();
    res.status(201).json(newTool);
  } catch (error) {
    res.status(500).json({ message: "Error adding tool" });
  }
};
