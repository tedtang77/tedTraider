angular.module('ProductListCtrl', []).controller('ProductListController', function($scope, Products, BasketItems) {
    Products.getAll(function(data) {
        //$scope.products = data
        $scope.products = data.products;
    });
    $scope.orderProp = 'price';
    $scope.quantityDict ={};


    $scope.addToBasket = function(product) {
        var quantity = $scope.quantityDict[product._id]
        //alert("addToBasket: {id: " + product._id + "}, { qty:" + quantity + "}");
        BasketItems.addOne(product._id, quantity, function(err, data) {
            $scope.$emit('basketUpdate');
            if (err) {
                alert(err);
                return;
            }
        });
    };
});
/*
angular.module('ProductListCtrl', []).controller('ProductListController', ['$scope', '$http', 'Products', 'BasketItems',
    function($scope, $http, Products, BasketItems) {

    $http.get('../../products/products.json').success(function(data) {
        $scope.products = data;
    }).error(function() {
        alert("ProductListCtrl error");
    });

    $scope.orderProp = 'price';

    $scope.addToBasket = function(product) {
        BasketItems.addOne(product.id, function(err, data) {
            $scope.$emit('basketUpdate');
            if (err) {
                alert(err);
                return;
            }
        });
    };
}]);
*/


/*
//TODO: to recover below codes from traider.io later
angular.module('ProductListCtrl', []).controller('ProductListController', function($scope, Products) {
    Products.getAll(function(data) {
        $scope.products = data;
    });
});
*/