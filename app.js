'use strict';

// Declare app level module which depends on views, and components
angular.module('todoList', [
    'ngRoute',
    'LocalStorageModule',
    'todoList.index',
    'todoList.about'
])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/' });
}])
// Configure localStorageServiceProvider to use "ls" as a localStorage name prefix
.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('ls');
}]);
