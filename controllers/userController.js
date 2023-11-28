const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const User = require("../models/user");

//implement form sanitation and validation once front end is present
exports.signUp = asyncHandler(async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      return next(err);
    } else {
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });

      const result = await user.save();
      res.json({ user: user });
    }
  });
});
