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