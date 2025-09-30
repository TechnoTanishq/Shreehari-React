const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

// Get user cart
router.get('/', auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.json({ items: [] });
  res.json(cart);
});

// Add item to cart
router.post('/', auth, async (req, res) => {
  const { productId, name, price, image, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = new Cart({ userId: req.user.id, items: [] });
  }

  const existingItem = cart.items.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, name, price, image, quantity });
  }

  await cart.save();
  res.json(cart);
});

// Update quantity
router.put('/update', auth, async (req, res) => {
  const { itemId, change } = req.body;
  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ msg: 'Cart not found' });

  const item = cart.items.id(itemId);
  if (!item) return res.status(404).json({ msg: 'Item not found' });

  item.quantity += change;
  if (item.quantity <= 0) item.remove();

  await cart.save();
  res.json(cart);
});

// Delete item
router.delete('/delete/:itemId', auth, async (req, res) => {
  try {
    const { itemId } = req.params;
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    const index = cart.items.findIndex(item => item._id.toString() === itemId);
    if (index === -1) {
      return res.status(404).json({ msg: 'Item not found in cart' });
    }

    cart.items.splice(index, 1); // remove the item from array
    await cart.save();

    res.status(200).json({ msg: 'Item deleted successfully', cart });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ msg: 'Server error while deleting item' });
  }
});

module.exports = router;
