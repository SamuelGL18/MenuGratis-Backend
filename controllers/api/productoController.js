const User = require("../../model/Usuario");
const upload = require("../../middleware/subirImagen"); // Import the upload middleware

const agregarProducto = async (req, res) => {
  try {
    // Use upload middleware to handle image upload (placed first)
    upload.single("image")(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Upload failed");
      }

      // Now `req.file` should be populated if upload succeeds
      const { filename } = req.file; // Destructure filename

      // ... rest of your code ...
      const item = req.body;

      const foundUser = await User.findOne({ username: req.user }).exec();
      if (!foundUser) return res.sendStatus(403);

      item.image = filename; // Store the filename in the product schema
      foundUser.saleItems.push(item); // Add the product to the user's cart

      await foundUser.save();
      res.json({ response: "Done" });
    });
  } catch (error) {
    // ... error handling ...
    console.error(error);
    res.status(500).send("Server error");
  }
};

const actualizarProducto = async (req, res) => {
  if (!req?.params?.idproducto) {
    return res
      .status(400)
      .json({ message: "No se ha encontrado ese producto" });
  }
  const usuario = await User.findOne({ username: req.user }).exec();
  const productoIndex = usuario.saleItems.findIndex((item) =>
    item._id.equals(req.params.idproducto)
  );

  if (productoIndex === -1) {
    return res
      .status(204)
      .json({ message: `No existe el producto ${req.params.idproducto}.` });
  }

  // Update properties directly at the index
  usuario.saleItems[productoIndex].name = req.body.name;
  usuario.saleItems[productoIndex].description = req.body.description;
  usuario.saleItems[productoIndex].price = req.body.price;
  usuario.markModified("saleItems"); // Important!
  const result = await usuario.save();
  res.json(result);
};

const eliminarProducto = async (req, res) => {
  if (!req?.params?.idproducto)
    return res.status(400).json({ message: "No hay ID." });

  const usuario = await User.findOne({ username: req.user }).exec();

  const productoIndex = usuario.saleItems.findIndex((item) =>
    item._id.equals(req.params.idproducto)
  );

  if (productoIndex === -1) {
    return res
      .status(204)
      .json({ message: `No existe el producto ${req.params.idproducto}.` });
  }
  usuario.saleItems.splice(productoIndex, 1); // Remove the product
  await usuario.save(); // Save the updated user

  res.json({ message: "Product deleted successfully" }); // Or send the deleted product
};

const getProducto = async (req, res) => {
  if (!req?.params?.idproducto)
    return res.status(400).json({ message: "No hay ID del producto" });
  const usuario = await User.findOne({ username: req.user })
    .select("saleItems")
    .lean();

  const productoIndex = usuario.saleItems.findIndex((item) =>
    item._id.equals(req?.params?.idproducto)
  );

  if (productoIndex === -1) {
    return res
      .status(204)
      .json({ message: `No existe el producto ${req?.params?.idproducto}.` });
  }

  const producto = usuario.saleItems[productoIndex];
  res.json(producto);
};

module.exports = {
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
  getProducto,
};
