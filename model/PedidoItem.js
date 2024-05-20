const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pedidoItem = new Schema({
  productoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
  subTotal: { type: Number },
});

module.exports = pedidoItem;
