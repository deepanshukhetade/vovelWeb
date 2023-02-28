const mongoose = require("mongoose");

const Product = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    image: { type: String },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", Product);
