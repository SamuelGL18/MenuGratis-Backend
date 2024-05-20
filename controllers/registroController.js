const Usuario = require("../model/Usuario");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const ingresarNuevoUsuario = asyncHandler(async (req, res) => {
  const { nombreUsuario, password } = req.body;
  const passwordEncriptada = await bcrypt.hash(password, 10);
  const nuevoUsuario = await Usuario.create({
    nombreUsuario,
    password: passwordEncriptada,
  });
  if (nuevoUsuario) {
    res.status(201).json(nuevoUsuario.nombreUsuario);
  } else {
    res.status(500).json({ error: "Hubo un fallo al crear el usuario" });
  }
});

module.exports = { ingresarNuevoUsuario };
