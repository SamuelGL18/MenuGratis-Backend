const express = require("express");
const router = express.Router();
const tiendaController = require("../../controllers/api/tiendaController");

router
  .route("/:id")
  .get(tiendaController.getTienda)
  .get(tiendaController.getProducto);

module.exports = router;
