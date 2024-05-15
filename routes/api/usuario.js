const express = require("express");
const router = express.Router();
const getInfoController = require("../../controllers/api/usuarioController");

router.get("/", getInfoController.getUserInfo);

module.exports = router;
