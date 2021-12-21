const mongoose = require("mongoose");

const wareProductSchema = new mongoose.Schema(
  {
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouse',
      required: "Warehouse Number is required!",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: "Product ID is required!"
    },
    quantity:{
      type: Number,
      required: "Quantity is required!"
    }
  },
  {
    timestamps: true,
  }
);

const wareProd = mongoose.model("wareProd", wareProductSchema);

module.exports = wareProd;
