import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import bookRoutes from './Routes/BookRoutes.js';
import userRoutes from './Routes/UserRoutes.js';
import authRoutes from './Routes/authRoutes.js';

const app = express();
const MONGO_URI = process.env.MONGO_URI;

// Connect to the database
connectDB(MONGO_URI);

// Middleware
app.use(cors());
app.use(express.json());  // Use express.json() to parse incoming requests

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
