const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pedidoItem = new Schema({
  owner: {
    type: String,
    required: true,
  },
  productoId: {
    type: String,
    required: true,
  },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
  subTotal: { type: Number },
});

module.exports = pedidoItem;
