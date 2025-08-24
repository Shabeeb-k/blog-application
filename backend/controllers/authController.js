const dotenv = require("dotenv").config();
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
    console.log('process.env.JWT_SECRET', process.env.JWT_SECRET);
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
};

exports.logout = asyncHandler(async (req, res) => {

    res.json({ message: 'Logged out successfully' });
});

exports.register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please provide name, email and password');
    }
    const existing = await User.findOne({ email });
    if (existing) {
        res.status(400);
        throw new Error('Email already registered');
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
    });
});

// @desc Register new admin (requires secret)
// @route POST /api/auth/register-admin
// @access Public (but requires ADMIN_SECRET)



// @desc Login user
// @route POST /api/auth/login
// @access Public
exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


// @desc Get current user
// @route GET /api/auth/me
// @access Private
exports.currentUser = asyncHandler(async (req, res) => {
    const user = req.user; // set by protect
    res.json(user);
});