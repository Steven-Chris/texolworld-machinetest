const express = require("express");
const router = express.Router();
const { validate } = require("../middleware/validationResultHandler");
const productController = require("../../api/controllers/productController");
const { productValidate } = require("../middleware/inputValidation");
const { AC_auth } = require("../middleware/tokenAuthentication");

router.post(
  "/create",
  AC_auth,
  productValidate(),
  validate,
  productController.createProducts
);
router.get("/list", AC_auth, productController.listProducts);
module.exports = router;
