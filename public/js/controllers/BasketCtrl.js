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



