const User = require('../models/User');
const Post = require('../models/Post');

// @desc Get all users with their posts
// @route GET /api/admin/users-with-posts
// @access Admin
exports.getUsersWithPosts = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const usersWithPosts = await Promise.all(
      users.map(async user => {
        const posts = await Post.find({ author: user._id }).select('_id title');
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          posts
        };
      })
    );
    res.json(usersWithPosts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
