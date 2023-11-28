const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const Comment = require("../models/comment");

//form validation
exports.createComment = asyncHandler(async (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const comment = new Comment({
        author: authData.user,
        post: req.params.postId,
        content: req.body.content,
      });
      const result = await comment.save();
      res.json(comment);
    }
  });
});

exports.getPostComments = asyncHandler(async (req, res, next) => {
  try {
    const allComments = await Comment.find({ post: req.params.postId })
      .populate("author")
      .exec();
    res.json(allComments);
  } catch (err) {
    res.json(err);
  }
});
