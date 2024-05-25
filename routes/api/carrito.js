const express = require("express");
const router = express.Router();
const carritoController = require("../../controllers/api/carritoController");

router
  .route("/")
  .post(carritoController.agregarAlCarrito)
  .get(carritoController.getCarrito);

router.route("/enviarPedidos").get(carritoController.enviarPedidos);

module.exports = router;
