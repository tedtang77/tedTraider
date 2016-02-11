angular.module('frontendApp', ['ngRoute', 'appRoutes', 'ProductListCtrl', 'ProductDetailsCtrl', 'ProductService', 'BasketCtrl', 'BasketItemService']);

// IMPORTANT:  why use ngRoute here?
// https://docs.angularjs.org/api/ngRoute
// First include angular-route.js in your HTML:
// <script src="angular.js">
// <script src="angular-route.js">
// $route is used for deep-linking URLs to controllers and views (HTML partials). It watches $location.url() and tries to map the path to an existing route definition.
// Requires the ngRoute module to be installed.
// bind with "ngView" Directive
// ngView is a directive that complements the $route service by including the rendered template of the current route into the main layout (index.html) file. Every time the current route changes, the included view changes with it according to the configuration of the $route service.

// QUESTION: how does this angular.module dependency work?
