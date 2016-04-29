/**
 * Created by david on 4/28/16.
 */
"use strict";

var express = require("express");
var router = express.Router();

router.get("/", function (request, response) {
   response.send("/home/david/Code/banking_app/public/index.html");
});


module.exports = router;