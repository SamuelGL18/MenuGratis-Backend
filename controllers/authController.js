const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: `El usuario y la contraseña son obligatorios` });
  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) return res.sendStatus(401);
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const accesstoken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    const refreshtoken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    foundUser.refreshToken = refreshtoken;
    await foundUser.save();
    res.cookie("refreshtoken", refreshtoken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
