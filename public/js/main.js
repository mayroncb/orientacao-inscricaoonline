angular.module('app', ['ngRoute', 'ngResource', 'toastr'])
    .config(function($routeProvider, $httpProvider) {

        $httpProvider.interceptors.push('interceptor');

        $routeProvider.when('/users', {
            templateUrl: 'partials/users.html',
            controller: 'UsersController'
        });

        $routeProvider.when('/user/:id', {
            templateUrl: 'partials/user.html',
            controller: 'UserController'
        });

        $routeProvider.when('/user', {
            templateUrl: 'partials/user.html',
            controller: 'UsersController'
        });

        $routeProvider.when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginController'
        });

        $routeProvider.when('/cadastro', {
            templateUrl: 'partials/signup.html',
            controller: 'UserController'
        });

        $routeProvider.otherwise({redirectTo: '/login'});

    }) ;
