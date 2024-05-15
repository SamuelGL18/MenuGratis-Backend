const User = require("../model/User");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const handleNewUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const hashedPwd = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    password: hashedPwd,
    page: {},
  });
  if (newUser) {
    res.status(201).json(newUser._id);
  } else {
    res.status(500).json({ error: "Failed to create user" }); // Send error response
  }
});

module.exports = { handleNewUser };
