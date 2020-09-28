const { Schema, model, Types } = require("mongoose");

const OrderShema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  adress: { type: String, required: true },
  count: { type: Number, required: true },
  sum: { type: Number, required: true },
  goods: { type: Array, required: true },
  owner: { type: Types.ObjectId, ref: "Order", required: true },
});

module.exports = model("Order", OrderShema);
