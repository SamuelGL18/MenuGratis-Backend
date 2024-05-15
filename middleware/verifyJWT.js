const jwt = require("jsonwebtoken");
const User = require("../model/User");

const verifyJWT = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.refreshtoken) return res.sendStatus(401);
  const refreshtoken = req.cookies.refreshtoken;
  const foundUser = await User.findOne({ refreshToken: refreshtoken }).exec();
  if (!foundUser) return res.sendStatus(403); //Forbidden
  jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    req.user = decoded.username;
  });
  next();
};

module.exports = verifyJWT;
