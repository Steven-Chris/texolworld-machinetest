const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema(
  {
    warehouseNumber: {
      type: String,
      required: "warehouse is required",
    },
    stockLimit: {
      type: Number,
      required: false
    },
    currentCapacity:{
      type: Number,
    }
  },
  {
    timestamps: true,
  }
);
warehouseSchema.pre('save', function (next) {
    this.currentCapacity = this.get('stockLimit'); 
    next();
});
const warehouse = mongoose.model("Warehouse", warehouseSchema);

module.exports = warehouse;
