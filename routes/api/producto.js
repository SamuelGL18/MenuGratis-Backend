const express = require("express");
const router = express.Router();
const productoController = require("../../controllers/api/productoController");

router
  .route("/:idproducto")
  .get(productoController.getProducto)
  .patch(productoController.actualizarProducto)
  .delete(productoController.eliminarProducto);

router.route("/").post(productoController.agregarProducto);
// .get(productoController);

module.exports = router;
