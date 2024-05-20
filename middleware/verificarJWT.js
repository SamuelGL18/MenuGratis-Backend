const jwt = require("jsonwebtoken");
const Usuario = require("../model/Usuario");

const verificarJWT = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.refreshtoken) return res.sendStatus(401);
  const refreshtoken = req.cookies.refreshtoken;
  const usuarioEncontrado = await Usuario.findOne({
    refreshToken: refreshtoken,
  }).exec();

  if (!usuarioEncontrado) return res.sendStatus(403); //Forbidden
  jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || usuarioEncontrado.nombreUsuario !== decoded.nombreUsuario)
      return res.sendStatus(403);
    req.username = decoded.nombreUsuario;
  });
  next();
};

module.exports = verificarJWT;
