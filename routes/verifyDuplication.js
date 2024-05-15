const express = require("express");
const router = express.Router();
const verifyDuplicationController = require("../controllers/verifyDuplicationController");

router.post("/", verifyDuplicationController.isDuplicated);

module.exports = router;
