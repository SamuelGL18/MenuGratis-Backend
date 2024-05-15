const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  image: {
    required: true,
    type: String,
  },
});

module.exports = productSchema;
