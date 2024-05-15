const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  icon: {
    type: String,
  },
  storePhoto: {
    type: String,
  },
  storeName: {
    type: String,
  },
  description: {
    type: Boolean,
  },
  location: {
    type: String,
  },
});

module.exports = storeSchema;
