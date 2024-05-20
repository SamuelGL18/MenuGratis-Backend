const express = require("express");
const router = express.Router();
const autorizacionController = require("../controllers/autorizacionController");

router.post("/", autorizacionController.logear);

module.exports = router;
