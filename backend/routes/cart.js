const express = require('express');
const router = express.Router();
const { Cart, Product } = require('../models');
const { authMiddleware } = require('../middleware/auth');

// Get cart items
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: { userId: req.userId },
      include: [{ model: Product }]
    });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add to cart
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity, selectedSize, selectedColor } = req.body;

    let cartItem = await Cart.findOne({
      where: { userId: req.userId, productId }
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        userId: req.userId,
        productId,
        quantity,
        selectedSize,
        selectedColor
      });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove from cart
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Cart.destroy({
      where: { id: req.params.id, userId: req.userId }
    });
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
