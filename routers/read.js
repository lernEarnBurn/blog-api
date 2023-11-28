const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

router.get("/posts", postController.getAllPosts);

router.get("/posts/:postId/comments", commentController.getPostComments);

router.get("/posts/:userId", postController.getUsersPosts);

module.exports = router;
