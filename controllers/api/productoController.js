const Usuario = require("../../model/Usuario");
const upload = require("../../middleware/subirImagen");
const asyncHandler = require("express-async-handler");

const agregarProducto = asyncHandler(async (req, res) => {
  //* Inicio de multer
  try {
    // Almacenar la imagen en la carpeta uploads
    upload.single("imagen")(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Upload failed");
      }

      // Obtener el nombre del archivo
      const { filename } = req.file;
      //* ...Fin de multer

      const item = req.body;

      const usuarioEncontrado = await Usuario.findOne({
        nombreUsuario: req.username,
      }).exec();
      if (!usuarioEncontrado) return res.sendStatus(403);
      if (!usuarioEncontrado.tienda.categorias.includes(item.categoria)) {
        usuarioEncontrado.tienda.categorias.push(item.categoria);
      }
      item.imagen = filename;
      usuarioEncontrado?.mercancias?.push(item);

      await usuarioEncontrado.save();
      res.sendStatus(201);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error al tratar de crear el producto");
  }
});

const actualizarProducto = asyncHandler(async (req, res) => {
  if (!req?.params?.idproducto) {
    return res
      .status(400)
      .json({ message: "No se ha encontrado ese producto" });
  }
  const usuario = await Usuario.findOne({ nombreUsuario: req.username }).exec();
  const productoIndex = usuario?.mercancias?.findIndex((item) =>
    item._id.equals(req.params.idproducto)
  );

  if (productoIndex === -1) {
    return res
      .status(204)
      .json({ message: `No existe el producto ${req.params.idproducto}.` });
  }
  if (
    !usuario.mercancias[productoIndex].categoria.includes(req.body.categoria)
  ) {
    usuario.tienda.categorias.push(req.body.categoria);
  }
  // Actualizar los datos
  usuario.mercancias[productoIndex].nombre = req.body.nombre;
  usuario.mercancias[productoIndex].descripcion = req.body.descripcion;
  usuario.mercancias[productoIndex].precio = req.body.precio;
  usuario.mercancias[productoIndex].categoria = req.body.categoria;
  usuario.markModified("mercancias");
  const resultado = await usuario.save();
  res.json(resultado);
});

const eliminarProducto = asyncHandler(async (req, res) => {
  if (!req?.params?.idproducto)
    return res.status(400).json({ message: "No hay ID." });

  const usuario = await Usuario.findOne({ nombreUsuario: req.username }).exec();

  const productoIndex = usuario?.mercancias?.findIndex((item) =>
    item._id.equals(req.params.idproducto)
  );

  if (productoIndex === -1) {
    return res
      .status(204)
      .json({ message: `No existe el producto ${req.params.idproducto}.` });
  }
  usuario.mercancias.splice(productoIndex, 1); // Remove the product
  await usuario.save(); // Save the updated user

  res.json({ message: "Se ha eliminado el producto" }); // Or send the deleted product
});

const getProducto = async (req, res) => {
  if (!req?.params?.idproducto)
    return res.status(400).json({ message: "No hay ID del producto" });
  const usuario = await Usuario.findOne({ nombreUsuario: req.username })
    .select("mercancias")
    .lean();

  const productoIndex = usuario?.mercancias?.findIndex((item) =>
    item._id.equals(req?.params?.idproducto)
  );

  if (productoIndex === -1) {
    return res
      .status(204)
      .json({ message: `No existe el producto ${req?.params?.idproducto}.` });
  }

  const producto = usuario?.mercancias[productoIndex];
  res.json(producto);
};

module.exports = {
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
  getProducto,
};
