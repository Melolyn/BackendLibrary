// In your backend (e.g., auth.js)
import { Router } from 'express';
import { hash } from 'bcryptjs';
import User, { findOne } from '../UserModel.js';

const router = Router();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up user' });
  }
});

export default router;
