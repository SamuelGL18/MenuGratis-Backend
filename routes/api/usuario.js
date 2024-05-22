const express = require("express");
const router = express.Router();
const getInfoController = require("../../controllers/api/usuarioController");

router.get("/", getInfoController.getUsuarioInfo);

module.exports = router;
