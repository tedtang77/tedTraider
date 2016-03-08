// TODO: to add "Save Basket Items" feature
angular.module('BasketCtrl', []).controller('BasketController', function($scope, BasketItems) {
    BasketItems.getAll(function(data) {
        //$scope.products = data;
        $scope.cart = data.user.data.cart;
        $scope.totalAmount = 0;
        $scope.totalQuantity = 0;
        $scope.currency = '$';

        $scope.basketOrder = 'quantity';

        var currencySymbols = {
            'USD': '$',
            'EUR': '€',
            'GBP': '£'
        };

        //$scope.countTotal();
        for (var i = 0; i < $scope.cart.length; i++) {
            $scope.totalQuantity += $scope.cart[i].quantity;
            $scope.totalAmount += parseFloat($scope.cart[i].product.offerPriceAmount) * parseInt($scope.cart[i].quantity);
            $scope.currency = currencySymbols[$scope.cart[i].product.price.currency];
        }

        BasketItems.itemCount = $scope.totalQuantity;
        $scope.basketItemCount = BasketItems.itemCount;

        //alert($scope.cart.length);
        /*
        $scope.products = data.user.data.cart.product;
        $scope.quantity = data.user.data.cart.quantity;
        */
    });

    //$scope.basketItemCount = 0;

    $scope.basketItemCount = BasketItems.itemCount;

    $scope.$on('handleItemCount', function() {
        $scope.basketItemCount = BasketItems.itemCount;
    });

    $scope.setBasketOrder = function(value){
        $scope.basketOrder = value;
    }

    $scope.countTotal = function() {
        $scope.totalQuantity = 0;
        $scope.totalAmount = 0
        for (var i = 0; i < $scope.cart.length; i++) {
            $scope.totalQuantity += parseInt($scope.cart[i].quantity);
            $scope.totalAmount += parseFloat($scope.cart[i].product.offerPriceAmount) * parseInt($scope.cart[i].quantity);
        }
    }
});


/*

 angular.module('BasketCtrl', []).controller('BasketController', function($scope, BasketItems) {
 BasketItems.getAll(function(data) {
 $scope.products = data;
 });

 $scope.basketItemCount = BasketItems.itemCount;

 $scope.$on('handleItemCount', function() {
 $scope.basketItemCount = BasketItems.itemCount;
 });

 });

*/

