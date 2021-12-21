const { body } = require("express-validator");
const Warehouse = require("../../models/warehouseModel");
const Product = require("../../models/productModel")
// PRODUCT VALIDATION
module.exports.productValidate = () => {
  return [
    body("name")
      .exists()
      .withMessage("Product Name is required.")
      .notEmpty()
      .withMessage("Product Name is required.")
      .trim()
      .isLength({ max: 50 })
      .withMessage("Full Name length can't be more than 50."),

   
    body("price")
      .exists()
      .withMessage("Price is required.")
      .notEmpty()
      .withMessage("Price is required.")
      .trim()
      .isLength({ max: 15 })
      .withMessage("Price length can't be more than 15."),

  ];
};

module.exports.warehouseValidate = () => {
  return [
    body("warehouseNumber")
      .exists()
      .withMessage("Warehouse Number is required.")
      .notEmpty()
      .withMessage("Warehouse Number is required.")
      .trim()
      .custom(value => {
        console.log(value)
    return Warehouse.findOne({warehouseNumber:value}).then(warehouse => {
      if (warehouse) {
        return Promise.reject('Warehouse Number must be unique!');
      }
    });
  }),

    body("stockLimit")
      .optional({checkFalsy: true})
  ];
}
module.exports.wareProductValidate = () => {
  return [
    body("warehouseNumber")
      .exists()
      .withMessage("Warehouse Number is required.")
      .notEmpty()
      .withMessage("Warehouse Number is required.")
      .trim()
      .custom(value => {
        console.log(value)
    return Warehouse.findOne({warehouseNumber:value}).then(warehouse => {
      if (!warehouse) {
        return Promise.reject('Warehouse not found!');
      }
    });
  }),
    body("productId")
      .exists()
      .withMessage("Product ID is required.")
      .notEmpty()
      .withMessage("Product ID is required.")
      .trim()
      .custom(value => {
        console.log(value)
    return Product.findById(value).then(Product => {
      if (!Product) {
        return Promise.reject('Product ID is Invalid!');
      }
    });
  }),
  
    body("quantity")
      .exists()
      .withMessage("Quantity is required.")
      .notEmpty()
      .withMessage("Quantity is required.")
      .trim()
  ];
}
