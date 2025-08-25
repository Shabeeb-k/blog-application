const express = require('express');
const router = express.Router();
const { createComment, getComments, deleteComment } = require('../controllers/commentController');
const { protect } = require('../middleware/auth');


router.get('/:postId', getComments);
router.post('/:postId', protect, createComment);
router.delete('/:id', protect, deleteComment);


module.exports = router;