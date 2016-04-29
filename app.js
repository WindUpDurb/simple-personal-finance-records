"use strict";

const PORT = process.env.PORT || 3000;

var express = require("express");
var morgan = require("morgan");
var bodyParser = require('body-parser');

var app = express();

app.use(express.static("public"));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", require("./routes/index"));
app.use("/api", require("./routes/api"));


app.listen(PORT, function (error) {
   console.log(error || `Server listening on port ${PORT}`);
});