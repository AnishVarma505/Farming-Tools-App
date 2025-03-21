const express = require("express");
const cart = require("../models/Cart");

const router = express.Router();

router.post("/add", async (req, res) => {
    const { userId, toolId } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.toolId.toString() === toolId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({ toolId, quantity: 1 });
    }

    await cart.save();
    res.json({ message: "Added to cart" });
});

router.get("/:userId", async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.toolId");
    res.json(cart);
});

module.exports = router;
