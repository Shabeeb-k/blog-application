const express = require('express');
const router = express.Router();
const { getUsersWithPosts } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');

// GET /api/admin/users-with-posts
router.get('/users-with-posts', protect, authorizeRoles('admin'), getUsersWithPosts);

module.exports = router;
