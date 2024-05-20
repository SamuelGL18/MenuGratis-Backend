const mongoose = require("mongoose");
const pedidoItem = require("./PedidoItem");
const Schema = mongoose.Schema;

const pedido = new Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  itemsPedido: [pedidoItem],
  total: { type: Number, required: true },
  ubicacionEntrega: {
    type: String,
  },
  fechaEmision: {
    type: Date,
    default: Date.now,
    required: true,
  },
  estado: {
    type: String,
  },
});

module.exports = pedido;
