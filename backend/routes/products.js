const express = require('express');
const router = express.Router();
const { Product, Category } = require('../models');
const { Op } = require('sequelize');

// Get all products with filters
router.get('/', async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;

    const where = { isActive: true };
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }
    if (category) where.categoryId = category;
    if (minPrice) where.price = { [Op.gte]: minPrice };
    if (maxPrice) where.price = { [Op.lte]: maxPrice };

    const products = await Product.findAndCountAll({
      where,
      include: [{ model: Category }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      products: products.rows,
      total: products.count,
      page: parseInt(page),
      pages: Math.ceil(products.count / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }]
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
