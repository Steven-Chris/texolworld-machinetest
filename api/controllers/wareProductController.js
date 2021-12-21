"use strict";
const constantConfig = require("../../config/constantConfig");
const { handleError } = require("../lib/errorHandling");
const WareProduct = require("../../models/wareProductModel");
const Warehouse = require("../../models/warehouseModel");

module.exports.stock = async (req, res) => {
  console.log(req.body);
  let data = {
    productId: req.body.productId,
    quantity: req.body.quantity,
  };
  try {
      
     const warehouse = await Warehouse.findOne({warehouseNumber: req.body.warehouseNumber})
    data.warehouseId = warehouse._id;
    //  check if the capacity is 0 or will be 0 once stocked
       if(warehouse.currentCapacity === 0 || (warehouse.currentCapacity - req.body.quantity) <= 0){
        return res.status(constantConfig.ERROR_CODE).json({
          status: constantConfig.ERROR,
          message: "Warehouse does not have the required capacity!",
          currentCapacity: warehouse.currentCapacity,
        });
       }
    const wareProdData = new WareProduct(data);
    wareProdData.save(async (error) => {
      if (error) {
        handleError("error", error, "");
      } else {
         let newCapacity = warehouse.currentCapacity - req.body.quantity;
       await Warehouse.findOneAndUpdate({warehouseNumber: req.body.warehouseNumber}, {currentCapacity: newCapacity})
        res.status(constantConfig.SUCCESS_CODE).json({
          status: constantConfig.SUCCESS,
          message: `Product created!`,
          product: wareProdData,
        });
      }
    });
  } catch (err) {
    handleError("error", err, "");
    return res.status(constantConfig.INTERNAL_SERVER_ERROR).json({
      status: constantConfig.ERROR,
      message: constantConfig.SOMETHING_WENT_WRONG,
    });
  }
};
module.exports.unstock = async (req, res) => {
  console.log(req.body);
  let data = {
    warehouseNumber: req.body.warehouseNumber,
    productId: req.body.productId,
    quantity: +req.body.quantity,
  };
  try {
    //  check if there are enough products in the warehouse
    const products = await WareProduct.find({productId: req.body.productId, unstocked: false})
    let prodCount = 0;
    products.forEach(product => {
      prodCount += product.quantity;
    })      
    if(req.body.quantity > prodCount){
      return res.status(constantConfig.ERROR_CODE).json({
          status: constantConfig.ERROR,
          message: `Not enough products in this warehouse!`,
          productCount: prodCount,
        });
    }
    const warehouse = await Warehouse.findOne({warehouseNumber: req.body.warehouseNumber})
    let newCapacity = warehouse.currentCapacity + data.quantity;
    const removed = await Warehouse.findOneAndUpdate({warehouseNumber: req.body.warehouseNumber},{currentCapacity: newCapacity})
    return res.status(constantConfig.SUCCESS_CODE).json({
          status: constantConfig.SUCCESS,
          message: `${req.body.quantity} products successfully unstocked!`,
          currentCapacity: newCapacity,
        });
  } catch (err) {
    handleError("error", err, "");
    return res.status(constantConfig.INTERNAL_SERVER_ERROR).json({
      status: constantConfig.ERROR,
      message: constantConfig.SOMETHING_WENT_WRONG,
    });
  }
};

