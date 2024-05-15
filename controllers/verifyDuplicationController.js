const User = require("../model/User");

const isDuplicated = async (req, res) => {
  const { username } = req.body;
  const duplicate = await User.findOne({ username }).exec();
  if (duplicate) return res.json(409);
  res.json({ message: `User: ${username} is not duplicated!` }).status(200);
};

module.exports = { isDuplicated };
