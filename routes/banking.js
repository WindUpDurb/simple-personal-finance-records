"use strict";

var express = require("express");
var router = express.Router();
var BankingModels = require("../models/bankingModels");
var bankingHTML = "/home/david/Code/banking_app/public/index.html";


/*
router.all("/", function (request, response) {
    response.sendFile(bankingHTML)
});
*/

router.route("/")
    .get(function (request, response) {
        BankingModels.getTransactionData(function (error, transactionData) {
            if (error) {
                return response.status(400).send(error);
            }
            response.sendFile(bankingHTML)
            response.send(transactionData)
        });
    })
    .post(function (request, response) {
        BankingModels.createNewTransaction(request.body, function (error, newTransaction) {
            if (error) {
                return response.status(400).send(error);
            }
            response.send(newTransaction);
        });
    });

router.delete("/:id", function (request, response) {
        var toRemove = request.params.id
        BankingModels.deleteTransaction(toRemove, function (error) {
            if (error) {
                return response.status(400).send(error);
            }
            response.send("Transaction Deleted");
        })
    });

module.exports = router;