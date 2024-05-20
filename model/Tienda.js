const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tienda = new Schema({
  logo: {
    type: String,
  },
  tiendaFoto: {
    type: String,
  },
  nombreTienda: {
    type: String,
  },
  descripcion: {
    type: Boolean,
  },
  ubicacion: {
    type: String,
  },
  categorias: [String],
});

module.exports = tienda;
