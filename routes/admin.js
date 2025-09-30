// routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');  // your Mongoose User model

// Admin route to get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // exclude password field
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;
