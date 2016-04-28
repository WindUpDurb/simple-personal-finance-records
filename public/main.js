
var app = angular.module("myApp", []);

app.controller("mainController", function ($scope) {
    
    $scope.transactionList = [
        {
            date : "10/10/2016",
            name : "40 of King Cobra",
            debit : "$3.99",
            credit : "",
            memo : "Got drunk as fu' in the future."
        },
        {
            date : "12/12/2029",
            name : "Ray Gun",
            debit : "$49.99",
            credit : "",
            memo : "Weapon for the aliens"
        },
        {
            date : "09/19/2016",
            name : "Treasure Chest",
            debit : "",
            credit : "$100,000,000.16",
            memo : "Found that buried treasure, Doe."
        }
    ];
    

    $scope.sortBy = function (order) {
        if ($scope.sortOrder === order) {
            $scope.sortOrder = `-${order}`
        } else {
            $scope.sortOrder = order;
        }
    };
    
    $scope.addTransaction = function () {
        var newTransaction = {
            date : $scope.newTransaction.date,
            name : $scope.newTransaction.name,
            memo : $scope.newTransaction.memo
        };
        console.log($scope.newTransaction);
        if($scope.newTransaction.type === "Credit") {
            newTransaction.credit = $scope.newTransaction.amount;
            newTransaction.debit = "";
        } else {
            newTransaction.debit = $scope.newTransaction.amount;
            newTransaction.credit = "";
        }
        $scope.transactionList.push(newTransaction);
        $scope.newTransaction = {};
    };

    var editingIndex;

    $scope.editTransaction = function (transaction) {
        if (transaction.debit) {
            transaction.amount = transaction.debit;
        } else {
            transaction.amount = transaction.credit;
        }
        editingIndex = $scope.transactionList.indexOf(transaction);
        $scope.transactionToEdit = angular.copy(transaction);
        $scope.newTransaction = $scope.transactionToEdit;
    };

    $scope.deleteTransaction = function (transaction) {
        var transactionToDelete = $scope.transactionList.indexOf(transaction);
        $scope.transactionList.splice(transactionToDelete, 1);
    };
    
    $scope.saveTransactionEdits = function () {
        $scope.transactionList[editingIndex] = $scope.newTransaction;
        $scope.transactionToEdit = null;
    };

    $scope.cancelTransactionEdits = function () {
        $scope.newTransaction = null;
    };
    
});

