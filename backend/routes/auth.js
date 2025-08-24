const express = require('express');
const router = express.Router();
const { register, login, currentUser, logout } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
router.post('/logout', logout);

router.post('/register', register);
router.post('/login', login);
router.get('/currentuser', protect, currentUser);


module.exports = router;