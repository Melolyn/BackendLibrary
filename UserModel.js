const express = require('express');
const router = express.Router();
const User = require('./UserModel.js');  // Assuming you have a User model

// POST route for signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
    // Assuming the user model is set up to save users
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up user', error });
  }
});

module.exports = router;
