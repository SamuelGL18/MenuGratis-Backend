const Usuario = require("../model/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const logear = asyncHandler(async (req, res) => {
  const { nombreUsuario, password } = req.body;
  if (!nombreUsuario || !password)
    return res
      .status(400)
      .json({ message: `El usuario y la contraseña son obligatorios` });
  const usuarioEncontrado = await Usuario.findOne({ nombreUsuario }).exec();
  if (!usuarioEncontrado) return res.sendStatus(401);
  const passwordCorrecta = await bcrypt.compare(
    password,
    usuarioEncontrado.password
  );
  if (passwordCorrecta) {
    const accesstoken = jwt.sign(
      {
        nombreUsuario: usuarioEncontrado.nombreUsuario,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    const refreshtoken = jwt.sign(
      { nombreUsuario: usuarioEncontrado.nombreUsuario },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    usuarioEncontrado.refreshToken = refreshtoken;
    await usuarioEncontrado.save();
    res.cookie("refreshtoken", refreshtoken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "None",
      secure: false,
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

module.exports = { logear };
