const cart = require("../models/cart");

// Get User's Cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.tool");
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// Add Item to Cart
exports.addToCart = async (req, res) => {
  try {
    const { toolId, quantity } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if tool is already in cart
    const existingItem = cart.items.find((item) => item.tool.toString() === toolId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ tool: toolId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart" });
  }
};
