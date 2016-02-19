angular.module('ProductListCtrl', []).controller('ProductListController', function($scope, $http) {
    $http.get('../../products/products.json').success(function(data) {
        $scope.products = data;
    });

    $scope.orderProp = 'minPrice';
});
/* TODO: to recover below codes from traider.io later
angular.module('ProductListCtrl', []).controller('ProductListController', function($scope, Products) {
    Products.getAll(function(data) {
        $scope.products = data;
    });
});
*/