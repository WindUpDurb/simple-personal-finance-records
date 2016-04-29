"use strict";

var express = require("express");
var router = express.Router();

router.use("/banking", require("./banking"));

module.exports = router;