const Usuario = require("../model/Usuario");
const asyncHandler = require("express-async-handler");

const evitarDuplicacion = asyncHandler(async (req, res) => {
  const { nombreUsuario } = req.body;
  const duplicado = await Usuario.findOne({ nombreUsuario }).exec();
  if (duplicado) return res.json(409);
  res.json({ message: `No esta duplicado` }).status(200);
});

module.exports = { evitarDuplicacion };
