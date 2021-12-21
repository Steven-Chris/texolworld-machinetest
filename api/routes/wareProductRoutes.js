const express = require("express");
const router = express.Router();
const { validate } = require("../middleware/validationResultHandler");
const Controller = require("../../api/controllers/wareProductController");
const { wareProductValidate } = require("../middleware/inputValidation");
const { AC_auth } = require("../middleware/tokenAuthentication");

router.post(
  "/stock",
  AC_auth,
  wareProductValidate(),
  validate,
  Controller.stock
);
router.post(
  "/unstock",
  AC_auth,
  wareProductValidate(),
  validate,
  Controller.unstock
);
module.exports = router;
