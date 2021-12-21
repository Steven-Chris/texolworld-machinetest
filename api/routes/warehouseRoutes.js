const express = require("express");
const router = express.Router();
const { validate } = require("../middleware/validationResultHandler");
const Controller = require("../../api/controllers/warehouseController");
const { warehouseValidate } = require("../middleware/inputValidation");
const { AC_auth } = require("../middleware/tokenAuthentication");

router.post(
  "/create",
  AC_auth,
  warehouseValidate(),
  validate,
  Controller.createWarehouse
);
router.get("/list", AC_auth, Controller.listWarehouses);
router.get("/listDetails", AC_auth, Controller.listWarehousesDetails);
module.exports = router;
