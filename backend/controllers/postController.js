const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');

exports.createPost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const post = await Post.create({
        title,
        content,
        author: req.user._id
    });
    res.status(201).json(post);
});



exports.getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().populate('author', 'name email');
    res.json(posts);
});
exports.getPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }
    res.json(post);
});


exports.updatePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Forbidden');
    }
    const { title, content } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;
    await post.save();
    res.json(post);
});



exports.deletePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        if (!post.author) {
            return res.status(500).json({ message: 'Post author missing' });
        }
        if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        await Post.deleteOne({ _id: post._id });
        res.json({ message: 'Post removed' });
    } catch (err) {
        console.log('Delete post error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


exports.getMyPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({ author: req.user._id }).populate('author', 'name email');
    res.json(posts);
});