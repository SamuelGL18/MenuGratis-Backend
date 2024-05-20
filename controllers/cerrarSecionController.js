const Usuario = require("../model/Usuario");
const asyncHandler = require("express-async-handler");

const cerrarSecion = asyncHandler(async (req, res) => {
  // Accesediendo al refreshtoken
  const cookies = req.cookies;
  // Caso: no tiene refreshtoken
  if (!cookies?.refreshtoken) return res.sendStatus(204);
  const refreshToken = cookies.refreshtoken;

  // Eliminando de la cookie
  const usuarioEncontrado = await Usuario.findOne({ refreshToken }).exec();
  if (!usuarioEncontrado) {
    res.clearCookie("refreshtoken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }

  // Eliminando de la DB y cookie
  usuarioEncontrado.refreshToken = "";
  const resultado = await usuarioEncontrado.save();
  console.log(resultado);

  res.clearCookie("refreshtoken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
});

module.exports = { cerrarSecion };
