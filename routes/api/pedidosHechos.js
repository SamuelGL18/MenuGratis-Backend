const express = require("express");
const router = express.Router();
const pedidosHechosController = require("../../controllers/api/pedidosHechosController");

router.route("/").get(pedidosHechosController.getPedidosHechos);

module.exports = router;
