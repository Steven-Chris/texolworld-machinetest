"use strict";
const constantConfig = require("../../config/constantConfig");
const { handleError } = require("../lib/errorHandling");
const Product = require("../../models/productModel");

module.exports.createProducts = async (req, res) => {
  console.log(req.body);
  let data = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
  };
  try {
    const productData = new Product(data);
    productData.save((error) => {
      if (error) {
        handleError("error", error, "");
      } else {
        res.status(constantConfig.SUCCESS_CODE).json({
          status: constantConfig.SUCCESS,
          message: `Product created!`,
          product: data,
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
module.exports.listProducts = async (req, res) => {
  try {
    Product.find({}, (error, doc) => {
      if (error) {
        handleError("error", error, "");
      } else {
        res.status(constantConfig.SUCCESS_CODE).json({
          status: constantConfig.SUCCESS,
          message: `Product List`,
          product: doc,
        });
      }
    });
  } catch (err) {
    handleError("error", err, "");
    console.log(`err`, err);
    return res.status(constantConfig.INTERNAL_SERVER_ERROR).json({
      status: constantConfig.ERROR,
      message: constantConfig.SOMETHING_WENT_WRONG,
    });
  }
};
