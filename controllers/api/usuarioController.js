const User = require("../../model/Usuario");

const getUserInfo = async (req, res) => {
  const foundUser = await User.findOne({ username: req.user }).exec();
  if (!foundUser) return res.sendStatus(403);
  res.json(foundUser);
};
module.exports = { getUserInfo };
