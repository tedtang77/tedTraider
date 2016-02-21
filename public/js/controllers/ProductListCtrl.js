angular.module('ProductListCtrl', []).controller('ProductListController', function($scope, $http) {
    var basketService = {};

    $http.get('../../products/products.json').success(function(data) {
        $scope.products = data;
    }).error(function() {
        alert("ProductListCtrl error");
    });

    $scope.orderProp = 'minPrice';

    $scope.addToBasket = function(product) {

        basketService.itemCount = 0;

        basketService.broadcastItemCount = function() {
            $scope.$broadcast('handleItemCount');
        };

        BasketItems.addOne(product._id, function(err, data) {
            $scope.$emit('basketUpdate');
            if (err) {
                alert(err);
                return;
            }
        });
    };
});


/*
//TODO: to recover below codes from traider.io later
angular.module('ProductListCtrl', []).controller('ProductListController', function($scope, Products) {
    Products.getAll(function(data) {
        $scope.products = data;
    });
});
*/