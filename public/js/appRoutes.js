// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/product-list.html',
                controller: 'ProductListController'
            })
            .when('/product/:id', {
                templateUrl: '/views/product-details.html',
                controller: 'ProductDetailsController'
            })
            .when('/basket', {
                templateUrl: '/views/basket.html',
                controller: 'BasketController'
            });

        $locationProvider.html5Mode(true);
    }
]);

// IMPORTANT LEARNING
// Angular module
// https://docs.angularjs.org/api/ng/function/angular.module
// configure existing services inside initialization blocks.
