const express = require('express');
const router = express.Router();
const { Order, OrderItem, Cart, Product } = require('../models');
const { authMiddleware } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

// Get user orders
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.userId },
      include: [{ model: OrderItem }],
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { shippingAddress, billingAddress, paymentMethod } = req.body;

    const cartItems = await Cart.findAll({
      where: { userId: req.userId },
      include: [{ model: Product }]
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    let totalAmount = 0;
    cartItems.forEach(item => {
      totalAmount += item.Product.price * item.quantity;
    });

    const order = await Order.create({
      orderNumber: uuidv4().substring(0, 12).toUpperCase(),
      userId: req.userId,
      totalAmount,
      shippingAddress,
      billingAddress,
      paymentMethod
    });

    for (const item of cartItems) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        productName: item.Product.name,
        productImage: item.Product.image,
        quantity: item.quantity,
        price: item.Product.price,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor
      });
    }

    await Cart.destroy({ where: { userId: req.userId } });

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
