
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
 asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
});


exports.updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    const { name, email, password } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    await user.save();
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role });
});

exports.getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
});
exports.getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    
    if (req.user.role !== 'admin' && req.user._id.toString() !== user._id.toString()) {
        res.status(403);
        throw new Error('Forbidden');
    }
    res.json(user);
});



exports.updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    const { name, email, password, role } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; 
    if (role) user.role = role;
    await user.save();
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role });
});


exports.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User removed' });
});