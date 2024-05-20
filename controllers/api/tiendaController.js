const Usuario = require("../../model/Usuario");
const asyncHandler = require("express-async-handler");

const getTienda = asyncHandler(async (req, res) => {
  // Verifican parametros
  if (!req?.params?.id)
    return res.status(400).json({ message: "No se ha enviado el ID" });

  // Retornando usuario
  const tiendaEncontrada = await Usuario.findOne({ _id: req.params.id })
    .select("nombreUsuario mercancias tienda")
    .lean();
  if (!tiendaEncontrada) {
    return res.status(204).json({ message: `No se ha encontrado la tienda` });
  }
  res.json(tiendaEncontrada);
});

const getProducto = asyncHandler(async (req, res) => {
  // Verificando parametros
  if (!req?.params?.idproducto)
    return res.status(400).json({ message: "No hay ID del producto" });

  // Buscando la tienda
  const usuario = await User.findOne({ username: req.user })
    .select("saleItems")
    .lean();

  // Verificando si existe el producto
  const productoIndex = usuario.saleItems.findIndex((item) =>
    item._id.equals(req?.params?.idproducto)
  );
  if (productoIndex === -1) {
    return res
      .status(204)
      .json({ message: `No existe el producto ${req?.params?.idproducto}.` });
  }

  // Retornando el producto
  const producto = usuario.saleItems[productoIndex];
  res.json(producto);
});

module.exports = { getTienda, getProducto };
