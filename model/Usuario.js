const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const producto = require("./Producto");
const pedido = require("./Pedido");
const tienda = require("./Tienda");
const pedidoItem = require("./PedidoItem");

const usuario = new Schema({
  nombreUsuario: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  refreshToken: {
    type: String,
  },
  carrito: {
    type: [pedidoItem],
  },
  pedidosHechos: {
    type: [pedido],
  },
  pedidosRecividos: {
    type: [pedido],
  },
  perfilFacebook: {
    type: String,
  },
  perfilInstagram: {
    type: String,
  },
  fotoUsuario: {
    type: String,
  },
  tienda: {
    type: tienda,
  },
  mercancias: {
    type: [producto],
  },
  ubicacion: {
    type: String,
  },
});

module.exports = mongoose.model("Usuario", usuario);
