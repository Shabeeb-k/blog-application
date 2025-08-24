const express = require('express');
const router = express.Router();
const {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');


router.get('/', getPosts);
router.post('/', protect, createPost);
router.get('/:id', getPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.get('/myposts', protect, require('../controllers/postController').getMyPosts);


module.exports = router;