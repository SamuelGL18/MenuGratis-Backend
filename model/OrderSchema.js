const mongoose = require("mongoose");
const orderItemSchema = require("./OrderItemSchema");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [orderItemSchema],
  totalPrice: { type: Number, required: true },
  shippingAddress: {
    type: String,
  },
});

module.exports = ordersSchema;
