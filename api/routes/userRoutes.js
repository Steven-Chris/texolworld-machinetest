const express = require("express");
const router = express.Router();
const { validate } = require("../middleware/validationResultHandler");
const Controller = require("../../api/controllers/userController");

router.post("/signup", Controller.signUp);
router.post("/login", Controller.login);
module.exports = router;
