const express = require('express');
const router = express.Router();
const { getUsers, getUser, updateUser, deleteUser, getProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/', protect, authorizeRoles('admin'), getUsers);
router.get('/:id', protect, authorizeRoles('admin'), getUser);
router.put('/:id', protect, authorizeRoles('admin'), updateUser);
router.delete('/:id', protect, authorizeRoles('admin'), deleteUser);


module.exports = router;