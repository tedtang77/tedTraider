
angular.module('BasketCtrl', []).controller('BasketController', function($scope, BasketItems) {
    BasketItems.getAll(function(data) {
        //$scope.products = data;
        $scope.cart = data.user.data.cart;
        $scope.totalAmount = 0;
        $scope.totalQuantity = 0;
        $scope.currency = '$';

        var currencySymbols = {
            'USD': '$',
            'EUR': '€',
            'GBP': '£'
        };

        for (var i=0; i< $scope.cart.length; i++){
            $scope.totalQuantity+=$scope.cart[i].quantity;
            $scope.totalAmount+=parseInt($scope.cart[i].product.offerPriceAmount);
            $scope.currency= currencySymbols[$scope.cart[i].product.price.currency];
        }

        //alert($scope.cart.length);
        /*
        $scope.products = data.user.data.cart.product;
        $scope.quantity = data.user.data.cart.quantity;
        */
    });
    $scope.basketItemCount = 0;

    //$scope.basketItemCount = BasketItems.itemCount;

    $scope.$on('handleItemCount', function() {
        $scope.basketItemCount = BasketItems.itemCount;
    });

});


/*
//TODO: to recover below codes from traider.io later
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

