const expressAsyncHandler = require("express-async-handler");
const Usuario = require("../../model/Usuario");

const getPedidosHechos = expressAsyncHandler(async (req, res) => {
  const usuarioEncontrado = await Usuario.findOne({
    nombreUsuario: req.username,
  })
    .lean()
    .select("pedidosHechos");
  if (!usuarioEncontrado) return res.sendStatus(403);
  const listaPedidos = usuarioEncontrado.pedidosHechos;
  const detallesPedidos = [];

  for (const pedido of listaPedidos) {
    const factura = { ...pedido, itemsPedido: [] };
    for (const producto of pedido.itemsPedido) {
      const owner = await Usuario.findOne({ nombreUsuario: producto.owner })
        .lean()
        .select("mercancias");
      const mercancia = owner?.mercancias?.find(
        (item) => item?._id == producto.productoId
      );
      factura.itemsPedido.push({
        ...mercancia,
        subTotal: producto.subTotal,
        owner: producto.owner,
        cantidad: producto.cantidad,
      });
    }
    detallesPedidos.push(factura);
  }
  res.json(detallesPedidos);
});

module.exports = { getPedidosHechos };
