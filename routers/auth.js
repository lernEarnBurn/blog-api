const express = require("express");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const router = express.Router();

const User = require("../models/user");

router.post(
  "/log-in",
  asyncHandler(async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.json("user not found");
      }

      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return res.json("password is incorrect");
      }

      const token = jwt.sign(
        { user: user },
        process.env.SECRET_KEY,
        { expiresIn: "12h" },
        { algorithm: "HS256" },
      );
      res.json({ token: token, user: user });
    } catch (err) {
      console.log(err);
    }
  }),
);

module.exports = router;
