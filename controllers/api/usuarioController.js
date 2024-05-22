const Usuario = require("../../model/Usuario");

const getUsuarioInfo = async (req, res) => {
  const usuarioEncontrado = await Usuario.findOne({
    nombreUsuario: req.username,
  })
    .select("-password -refreshToken")
    .lean();
  if (!usuarioEncontrado) return res.sendStatus(403);
  res.json(usuarioEncontrado);
};
module.exports = { getUsuarioInfo };
