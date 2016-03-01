angular.module('BasketItemService', []).factory('BasketItems', ['$http', '$rootScope',
    function($http, $rootScope) {
        var basketService = {};

        basketService.itemCount = 0;

        basketService.broadcastItemCount = function() {
            $rootScope.$broadcast('handleItemCount');
        };


        basketService.getAll = function(callback) {
            //alert("basketService getAll");
            caller = this;
            $http({
                method: 'get',
                url: '/api/basketItems/'
            }).success(function(data) {
                alert("BasketItemService getAll Success");
                caller.itemCount = data.length;
                caller.broadcastItemCount();
                callback(data);
            }).error(function() {
                alert("BasketItemService getAll error");
            });
        };

        basketService.addOne = function(id, callback) {
            alert("basketService addOne:" + id);
            caller = this;
            $http({
                method: 'get',
                url: '/api/basketItems/Add/' + id
            }).success(function(data) {
                alert("BasketItemService addOne  Success");
                //setItemCount(10);
                caller.itemCount = data.ItemCount;
                caller.broadcastItemCount();
                callback(null, data);
            }).error(function(err) {
                alert("BasketItemService addOne Error");
                callback(err);
            });
        };

        return basketService;
    }
]);

/*
angular.module('BasketItemService', []).factory('BasketItems', ['$http', '$rootScope',
    function($http, $rootScope) {
        var basketService = {};

        basketService.itemCount = 0;

        basketService.broadcastItemCount = function() {
            $rootScope.$broadcast('handleItemCount');
        };


        basketService.getAll = function(callback) {
            //alert("basketService getAll");
            caller = this;
            $http({
                method: 'get',
                url: '/api/basketItems/'
            }).success(function(data) {
                alert("BasketItemService getAll Success");
                caller.itemCount = data.length;
                caller.broadcastItemCount();
                callback(data);
            }).error(function() {
                alert("BasketItemService getAll error");
            });
        };

        basketService.addOne = function(id, callback) {
            alert("basketService addOne:" + id);
            caller = this;
            $http({
                method: 'get',
                url: '/api/basketItems/Add/' + id
            }).success(function(data) {
                alert("BasketItemService addOne  Success");
                //setItemCount(10);
                caller.itemCount = data.ItemCount;
                caller.broadcastItemCount();
                callback(null, data);
            }).error(function(err) {
                alert("BasketItemService addOne Error");
                callback(err);
            });
        };

        return basketService;
    }
]);
*/
