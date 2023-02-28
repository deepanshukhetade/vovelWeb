const mongoose = require("mongoose");

const Order = new mongoose.Schema(
  {
    items: { type: Array },
    totalAmount: { type: String },
    name: { type: String },
    address: { type: String },
    contact: { type: String },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", Order);
