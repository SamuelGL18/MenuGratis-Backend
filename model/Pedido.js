const mongoose = require("mongoose");
const pedidoItem = require("./PedidoItem");
const Schema = mongoose.Schema;

const pedido = new Schema({
  usuarioId: {
    type: String,
    required: true,
  },
  itemsPedido: {
    type: [pedidoItem],
  },
  total: { type: Number },
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
