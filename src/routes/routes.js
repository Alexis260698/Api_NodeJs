const express = require("express");
const router = express.Router();
const controller = require("../controllers/Controller");

router
.post("/:option", controller.getAll)


module.exports = router;