const express = require("express");
const router = express.Router();
const verificarNombreController = require("../controllers/verificarNombreController");

router.post("/", verificarNombreController.evitarDuplicacion);

module.exports = router;
