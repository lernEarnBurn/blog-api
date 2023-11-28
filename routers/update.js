const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const verifyToken = require("../controllers/authController").verifyToken;

router.put("/posts/:postId", verifyToken, postController.updatePost);

module.exports = router;
