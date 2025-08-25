const asyncHandler = require('express-async-handler');
const Comment = require('../models/comment');
const Post = require('../models/Post');


exports.createComment = asyncHandler(async (req, res) => {
const { text } = req.body;
if (!text) {
res.status(400);
throw new Error('Comment text required');
}
const post = await Post.findById(req.params.postId);
if (!post) {
res.status(404);
throw new Error('Post not found');
}
const comment = await Comment.create({ text, author: req.user._id, post: post._id });
res.status(201).json(comment);
});



exports.getComments = asyncHandler(async (req, res) => {
const comments = await Comment.find({ post: req.params.postId })
.populate('author', 'name email')
.sort({ createdAt: -1 });
res.json(comments);
});



exports.deleteComment = asyncHandler(async (req, res) => {
const comment = await Comment.findById(req.params.id);
if (!comment) {
res.status(404);
throw new Error('Comment not found');
}
if (req.user.role !== 'admin' && comment.author.toString() !== req.user._id.toString()) {
res.status(403);
throw new Error('Forbidden');
}
await comment.remove();
res.json({ message: 'Comment removed' });
});