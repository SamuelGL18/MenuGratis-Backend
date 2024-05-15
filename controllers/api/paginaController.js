const User = require("../../model/User");

const getPageData = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.params.id })
    .select("username saleItems")
    .lean();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  res.json(user);
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

module.exports = { getPageData, getProducto };
