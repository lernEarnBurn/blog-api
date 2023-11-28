const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const Post = require("../models/post");
const Comment = require("../models/comment");

//add form validation
exports.createPost = asyncHandler(async (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const post = new Post({
        author: authData.user,
        title: req.body.title,
        content: req.body.content,
      });
      const result = await post.save();
      res.json(post);
    }
  });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const deletePost = await Post.findByIdAndDelete(req.params.postId);
      const deletePostComments = await Comment.deleteMany({
        post: req.params.postId,
      });
      res.json("deleted post");
    }
  });
});

exports.getAllPosts = asyncHandler(async (req, res, next) => {
  try {
    const allPosts = await Post.find({}).populate("author").exec();
    res.json(allPosts);
  } catch (err) {
    res.json(err);
  }
});

exports.getUsersPosts = asyncHandler(async (req, res, next) => {
  try {
    const myPosts = await Post.find({ author: req.params.userId }).exec();
    res.json(myPosts);
  } catch (err) {
    res.json(err);
  }
});

//form validation
exports.updatePost = asyncHandler(async (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const update = await Post.updateOne(
        { _id: req.params.postId },
        { $set: { title: req.body.newTitle, content: req.body.newContent } },
      );
      res.json("post updated");
    }
  });
});
