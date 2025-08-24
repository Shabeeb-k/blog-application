const dotenv = require("dotenv").config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const adminRoutes = require('./routes/admin');

const app = express();
//app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Connect DB
connectDB();


// Routes

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes);
console.log("JWT_SECRET from env:", process.env.JWT_SECRET);

// Error handler
app.use((err, req, res, next) => {
const status = res.statusCode === 200 ? 500 : res.statusCode;
res.status(status).json({ message: err.message, stack: process.env.NODE_ENV === 'production' ? null : err.stack });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));