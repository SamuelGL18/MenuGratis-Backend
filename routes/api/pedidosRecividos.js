const express = require("express");
const router = express.Router();
const pedidosRecividosController = require("../../controllers/api/pedidosRecividosControllers");

router.route("/").get(pedidosRecividosController.getPedidosRecividos);

module.exports = router;
