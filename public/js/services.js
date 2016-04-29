"use strict";

var app = angular.module("myApp");

app.service("BankingServices", function($http) {

    //manage all api calls

    this.getBankingData = function () {
        return $http.get("/api/banking")
    };

    this.addNewTransaction = function (newTransaction) {
        return $http.post("/api/banking", newTransaction)
    };

    this.removeTransaction = function (transactionToDelete) {
        return $http.delete(`/api/banking/${transactionToDelete.transactionName}`)
    };
    


});