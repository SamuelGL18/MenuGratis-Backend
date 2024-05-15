const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = require("./ProductSchema");
const orderSchema = require("./OrderSchema");
const storeSchema = require("./StoreSchema");

const userSchema = new Schema({
  username: {
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
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number },
    },
  ],
  // users can have and made orders
  ordersMade: [orderSchema],
  ordersRecieved: [orderSchema],
  facebookProfile: {
    type: String,
  },
  instagramProfile: {
    type: String,
  },
  userPhoto: {
    type: String,
  },
  store: {
    type: storeSchema,
  },
  saleItems: {
    type: [productSchema],
  },
  location: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
