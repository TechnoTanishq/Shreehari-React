const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

// ✅ Custom ID Generator
const generateCustomId = () => {
  return 'b' + Date.now();
};

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// ✅ PUT: Update Product
router.put('/update/:id', upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      description,
      oldPrice,
      newPrice,
      category,
      stock,
      badge
    } = req.body;

    const details = JSON.parse(req.body.details || '[]');

    const updateData = {
      name,
      price: parseFloat(newPrice),
      oldPrice: parseFloat(oldPrice),
      rating: 0, // You may want to keep this unchanged instead
      reviews: 0, // Same here
      badge,
      stock: parseInt(stock),
      description,
      details,
      category
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: '❌ Product not found' });
    }

    res.status(200).json({ message: '✅ Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('❌ Error updating product:', error);
    res.status(500).json({ message: '❌ Failed to update product', error: error.message });
  }
});


// ✅ POST: Add Product
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      description,
      oldPrice,
      newPrice,
      category,
      stock,
      badge
    } = req.body;

    const details = JSON.parse(req.body.details || '[]');

    const newProduct = new Product({
      _id: generateCustomId(),
      name,
      image: req.file ? `/uploads/${req.file.filename}` : '',
      price: parseFloat(newPrice),
      oldPrice: parseFloat(oldPrice),
      rating: 0,
      reviews: 0,
      badge,
      stock: parseInt(stock),
      description,
      details,
      category
    });

    await newProduct.save();
    res.status(201).json({ message: '✅ Product added successfully', product: newProduct });
  } catch (error) {
    console.error('❌ Error saving product:', error);
    res.status(500).json({ message: '❌ Failed to save product', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ GET: Fetch All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({ message: '❌ Failed to fetch products', error: error.message });
  }
});

module.exports = router;
