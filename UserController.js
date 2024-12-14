import User from '../UserModel.js';
import jwt from 'jsonwebtoken';
const { sign } = jwt;
import bcrypt from 'bcryptjs';
const { compare } = bcrypt;

// Register a user
export async function registerUser(req, res) {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Login a user
export async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        // Use User.findOne() directly on the User model
        const user = await User.findOne({ email }); // No need for named import of findOne
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
