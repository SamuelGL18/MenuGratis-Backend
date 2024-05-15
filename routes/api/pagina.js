const express = require("express");
const router = express.Router();
const getPageController = require("../../controllers/api/paginaController");

router
  .route("/:id")
  .get(getPageController.getPageData)
  .get(getPageController.getProducto);

module.exports = router;
