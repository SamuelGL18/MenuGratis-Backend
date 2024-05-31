const expressAsyncHandler = require("express-async-handler");
const Usuario = require("../../model/Usuario");

const getPedidosRecividos = expressAsyncHandler(async (req, res) => {
  const usuarioEncontrado = await Usuario.findOne({
    nombreUsuario: req.username,
  })
    .lean()
    .select("pedidosRecividos mercancias");
  if (!usuarioEncontrado) return res.sendStatus(403);
  const listaPedidos = usuarioEncontrado.pedidosRecividos;
  const detallesPedidos = [];

  for (const pedido of listaPedidos) {
    const cliente = await Usuario.findOne({ _id: pedido.usuarioId })
      .lean()
      .select("nombreUsuario");
    const factura = {
      ...pedido,
      itemsPedido: [],
      cliente: cliente.nombreUsuario,
    };
    for (const producto of pedido.itemsPedido) {
      const mercancia = usuarioEncontrado?.mercancias?.find(
        (item) => item?._id == producto.productoId
      );
      factura.itemsPedido.push({
        ...mercancia,
        subTotal: producto.subTotal,
        cantidad: producto.cantidad,
      });
    }
    detallesPedidos.push(factura);
  }

  res.json(detallesPedidos);
});

module.exports = { getPedidosRecividos };
