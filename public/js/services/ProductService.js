angular.module('ProductService', []).factory('Products', ['$http',
    function($http) {
        return {
            getAll: function(callback) {
                $http({
                    method: 'get',
                    url: '/api/products'
                }).success(function(data) {
                    //console.log(data);
                    callback(data);
                }).error(function() {
                    alert("Product Service getAll error");
                });
            },
            getOne: function(id, callback) {
                $http({
                    method: 'get',
                    url: '/api/product/id/' + id
                }).success(function(data) {
                    console.log(data);
                    callback(data);
                }).error(function() {
                    alert("Product Service getOne error");
                });
            }
        };
    }
]);
/*
angular.module('ProductService', []).factory('Products', ['$http',
    function($http) {
        return {
            getAll: function(callback) {
                $http({
                    method: 'get',
                    url: '/api/products'
                }).success(function(data) {
                    //console.log(data);
                    callback(data);
                }).error(function() {
                    alert("Product Service getAll error");
                });
            },
            getOne: function(id, callback) {
                $http({
                    method: 'get',
                    url: '/api/products/' + id
                }).success(function(data) {
                    //console.log(data);
                    callback(data);
                }).error(function() {
                    alert("Product Service getOne error");
                });
            }
        };
    }
]);
*/
