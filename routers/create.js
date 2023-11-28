const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const verifyToken = require("../controllers/authController").verifyToken;

router.post("/sign-up", userController.signUp);

router.post("/posts", verifyToken, postController.createPost);

router.post(
  "/posts/:postId/comments",
  verifyToken,
  commentController.createComment,
);

module.exports = router;
