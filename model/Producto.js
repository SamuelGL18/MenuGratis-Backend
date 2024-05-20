const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const producto = new Schema({
  nombre: {
    required: true,
    type: String,
  },
  descripcion: {
    type: String,
  },
  precio: {
    required: true,
    type: Number,
  },
  imagen: {
    required: true,
    type: String,
  },
  categoria: {
    type: String,
  },
});

module.exports = producto;
