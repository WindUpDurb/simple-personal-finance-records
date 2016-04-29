"use strict";

var app = angular.module("myApp");

app.controller("mainController", function ($scope, BankingServices) {
    $scope.newTransactionList = [];
    $scope.totalCredits = 0;
    $scope.totalDebits = 0;

    BankingServices.getBankingData()
        .then(function (response) {
            $scope.transactionList = response.data;
        })
        .catch(function (error) {
           console.log("Error: ", error);
        });

    $scope.addTransaction = function () {
        if ($scope.newTransaction.type === "Credit") {
            $scope.newTransaction.credit = $scope.newTransaction.amount;
        } else {
            $scope.newTransaction.debit = $scope.newTransaction.amount;
        }

       BankingServices.addNewTransaction($scope.newTransaction)
            .then(function(response) {
                var newTransaction = response.data;
                console.log("New transa" ,newTransaction);
                $scope.transactionList.push(newTransaction);
                if (newTransaction.credit) {
                    $scope.totalCredits += newTransaction.credit;
                } else {
                    $scope.totalDebits += newTransaction.debit;
                }
                $scope.newTransaction = null;
            })
            .catch(function (error) {
               console.log(error);
            });
    };

    $scope.removeTransaction = function (transactionToDelete) {
        console.log(transactionToDelete)
        BankingServices.removeTransaction(transactionToDelete)
            .then(function () {
                var index = $scope.transactionList.indexOf(transactionToDelete);
                $scope.transactionList.splice(index, 1);
            })
            .catch(function (error) {
               console.log(error);
            });
    };

    $scope.sortBy = function (order) {
        if ($scope.sortOrder === order) {
            $scope.sortOrder = `-${order}`
        } else {
            $scope.sortOrder = order;
        }
    };

    var editingIndex;

    ////work on updating amount after deleting transaction, editing.

    $scope.editTransaction = function (transaction) {
        if (transaction.debit) {
            transaction.amount = parseInt(transaction.debit);
        } else {
            transaction.amount = parseInt(transaction.credit);

        }
        editingIndex = $scope.transactionList.indexOf(transaction);
        $scope.transactionToEdit = angular.copy(transaction);
        $scope.newTransaction = $scope.transactionToEdit;
    };

    $scope.saveTransactionEdits = function () {
        $scope.transactionList.splice(editingIndex, 1);
        $scope.transactionList[editingIndex] = $scope.newTransaction;
        $scope.transactionToEdit = null;
    };

    $scope.cancelTransactionEdits = function () {
        $scope.newTransaction = null;
    };

    console.log($scope.debits)
});