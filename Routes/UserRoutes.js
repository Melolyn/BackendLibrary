import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../UserModel.js'; // Adjust path if needed

const router = express.Router();

// POST /signup - User Registration
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate inputs
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Store hashed password
    });

    await newUser.save(); // Save to database
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error in /signup route:', error);
    res.status(500).json({ message: 'Error signing up user', error: error.message });
  }
});

export default router;
