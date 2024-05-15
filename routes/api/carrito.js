const express = require("express");
const router = express.Router();
const carritoController = require("../../controllers/api/carritoController");

router.post("/", carritoController.handleAgregarAlCarrito);

module.exports = router;
