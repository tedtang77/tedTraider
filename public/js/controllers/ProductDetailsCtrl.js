angular.module('ProductDetailsCtrl', []).controller('ProductDetailsController', function($scope, $routeParams, Products, BasketItems) {
    var id = $routeParams.id;

    $scope.quantityDict ={};

    Products.getOne(id, function(data) {
        $scope.product = data.product;
        $scope.mainImageUrl = data.product.images[0];
    });

    $scope.setImage = function(imageUrl) {
        $scope.mainImageUrl = imageUrl;
    };

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
angular.module('ProductDetailsCtrl', []).controller('ProductDetailsController', function($scope, $routeParams, $http, BasketItems) {
    var id = $routeParams.id;

    $http.get('../../products/' + id +'.json').success(function(data) {
        $scope.product = data;
        $scope.mainImageUrl = data.images[0];
    }).error(function() {
        alert("ProductDetailsCtrl error");
    });

    $scope.setImage = function(imageUrl) {
        $scope.mainImageUrl = imageUrl;
    };

    $scope.addToBasket = function(product) {
        BasketItems.addOne(product.id, function(err, data) {
            $scope.$emit('basketUpdate');
            if (err) {
                alert(err);
                return;
            }
        });
    };
});
*/

/*
// TODO: to recover below codes from traider.io later
angular.module('ProductDetailsCtrl', []).controller('ProductDetailsController', function($scope, $routeParams, Products, BasketItems) {
    var id = $routeParams.id;
    
    Products.getOne(id, function(data) {
        $scope.product = data;
    });

    $scope.addToBasket = function(product) {
        BasketItems.addOne(product._id, function(err, data) {
            $scope.$emit('basketUpdate');
            if (err) {
                alert(err);
                return;
            }
        });
    };
});
*/