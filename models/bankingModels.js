"use strict";

var database = require("../config/db");

exports.getTransactionData = function (callback) {
  database.query("SELECT * FROM transactions", callback);
};

exports.createNewTransaction = function (newTransactionData, callback) {
  database.query(`INSERT INTO transactions (date, transactionName, debit, credit, memo) VALUES ("${newTransactionData.date}", "${newTransactionData.transactionName}", "${parseInt(newTransactionData.debit)}", "${parseInt(newTransactionData.credit)}","${newTransactionData.memo}")`);
  database.query(`SELECT * FROM transactions WHERE transactionName = "${newTransactionData.transactionName}"`, callback)
};

exports.deleteTransaction = function (transactionToDelete, callback) {
  database.query(`DELETE FROM transactions WHERE transactionName = "${transactionToDelete}"`, callback)
}