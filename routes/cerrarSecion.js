const express = require("express");
const router = express.Router();
const cerrarSecionController = require("../controllers/cerrarSecionController");

router.get("/", cerrarSecionController.cerrarSecion);

module.exports = router;
