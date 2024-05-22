const Usuario = require("../../model/Usuario");
const asyncHandler = require("express-async-handler");

const getTienda = asyncHandler(async (req, res) => {
  // Verifican parametros
  if (!req?.params?.usuario)
    return res.status(400).json({ message: "No se ha enviado el ID" });

  // Retornando usuario
  const tiendaEncontrada = await Usuario.findOne({
    nombreUsuario: req.params.usuario,
  })
    .select("nombreUsuario mercancias tienda pedidosRecividos")
    .lean();
  if (!tiendaEncontrada) {
    return res.status(204).json({ message: `No se ha encontrado la tienda` });
  }
  res.json(tiendaEncontrada);
});

const getProducto = asyncHandler(async (req, res) => {
  // Obteniendo parametros
  const { usuario, idproducto } = req.params;
  // Verificando parametros
  if (!idproducto)
    return res.status(400).json({ message: "No hay ID del producto" });

  if (!usuario) return res.status(400).json({ message: "No hay Usuario" });

  // Buscando la tienda
  const usuarioEncontrado = await Usuario.findOne({ nombreUsuario: usuario })
    .select("mercancias")
    .lean();

  // Verificando si existe el producto
  const productoIndex = usuarioEncontrado.mercancias.findIndex((item) =>
    item._id.equals(idproducto)
  );
  if (productoIndex === -1) {
    return res
      .status(204)
      .json({ message: `No existe el producto ${idproducto}.` });
  }

  // Retornando el producto
  const producto = usuarioEncontrado.mercancias[productoIndex];
  res.json(producto);
});

module.exports = { getTienda, getProducto };
