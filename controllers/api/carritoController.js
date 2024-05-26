const expressAsyncHandler = require("express-async-handler");
const Usuario = require("../../model/Usuario");

const agregarAlCarrito = expressAsyncHandler(async (req, res) => {
  const item = req.body;
  if (!item) return res.sendStatus(400);

  const usuarioEncontrado = await Usuario.findOne({
    nombreUsuario: req.username,
  }).exec();
  if (!usuarioEncontrado) return res.sendStatus(403);

  // Encontrar el index si es que esta repetido
  const productoEnCarritoIndex = usuarioEncontrado.carrito.findIndex(
    (producto) => producto.productoId == item.productoId
  );

  if (productoEnCarritoIndex !== -1) {
    // Actualizar
    usuarioEncontrado.carrito[productoEnCarritoIndex].cantidad += item.cantidad;
    usuarioEncontrado.carrito[productoEnCarritoIndex].subTotal += item.subTotal;
    usuarioEncontrado.markModified("carrito");
  } else {
    usuarioEncontrado.carrito.push(item);
  }
  await usuarioEncontrado.save();
  res.sendStatus(201);
});

const getCarrito = expressAsyncHandler(async (req, res) => {
  const usuarioEncontrado = await Usuario.findOne({
    nombreUsuario: req.username,
  })
    .lean()
    .select("carrito");
  if (!usuarioEncontrado) return res.sendStatus(403);
  const carrito = usuarioEncontrado.carrito;

  const productoPromesas = carrito.map(async (item) => {
    const owner = await Usuario.findOne({ nombreUsuario: item.owner })
      .lean()
      .select("mercancias");
    const producto = owner?.mercancias?.find(
      (producto) => producto?._id == item.productoId
    );

    return { ...item, producto };
  });

  const productos = await Promise.all(productoPromesas);

  const productosFiltrados = productos.filter(
    (producto) => producto !== undefined
  );
  const pedido = { productos: productosFiltrados, total: 0 };
  for (const producto of pedido.productos) {
    pedido.total = pedido.total + producto.subTotal;
  }
  res.json(pedido);
});

const enviarPedidos = expressAsyncHandler(async (req, res) => {
  const usuarioEncontrado = await Usuario.findOne({
    nombreUsuario: req.username,
  }).exec();
  if (!usuarioEncontrado) return res.sendStatus(403);
  const carrito = usuarioEncontrado.carrito;
  if (!carrito) return res.sendStatus(404);

  const owners = [];
  const ownersPedidos = [];

  for (const item of carrito) {
    if (!owners.includes(item.owner)) {
      owners.push(item.owner);
    }
  }

  for (const ownersName of owners) {
    ownersPedidos.push({
      ownerNombre: ownersName,
      itemsPedido: [],
      usuarioId: usuarioEncontrado._id,
      estado: "Pendiente",
      total: 0,
    });
  }

  for (const owner of ownersPedidos) {
    for (const item of carrito) {
      if (item.owner == owner.ownerNombre) {
        owner.itemsPedido.push(item);
      }
    }
  }

  for (const owner of ownersPedidos) {
    for (const item of owner.itemsPedido) {
      owner.total = owner.total + item.subTotal;
    }
  }

  for (const owner of ownersPedidos) {
    const pedido = {
      usuarioId: owner.usuarioId,
      itemsPedido: owner.itemsPedido,
      total: owner.total,
      estado: owner.estado,
    };
    const ownerEncontrado = await Usuario.findOneAndUpdate(
      { nombreUsuario: owner.ownerNombre },
      { $push: { pedidosRecividos: pedido } },
      { new: true }
    );

    if (!ownerEncontrado) {
      return res
        .status(404)
        .json({ message: `No se encontro el dueño ${item.owner}.` });
    }
  }

  const pedidoUsuario = {
    usuarioId: usuarioEncontrado._id,
    itemsPedido: [],
    total: 0,
    estado: "pendiente",
  };
  for (const items of carrito) {
    pedidoUsuario.itemsPedido.push(items);
    pedidoUsuario.total = pedidoUsuario.total + items.subTotal;
  }

  usuarioEncontrado.carrito = [];
  usuarioEncontrado.pedidosHechos.push(pedidoUsuario);
  await usuarioEncontrado.save();
  res.sendStatus(201);
});

module.exports = { agregarAlCarrito, getCarrito, enviarPedidos };
