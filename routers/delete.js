const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const verifyToken = require("../controllers/authController").verifyToken;

router.delete("/posts/:postId", verifyToken, postController.deletePost);

module.exports = router;
