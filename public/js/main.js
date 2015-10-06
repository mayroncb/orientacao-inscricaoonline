angular.module('app', ['ngRoute', 'ngResource', 'toastr', 'ui.router'])
    .config(function($urlRouterProvider, $httpProvider, $stateProvider) {

    $httpProvider.interceptors.push('interceptor');


    $stateProvider
    .state('login', {
         abstract: true,
          views: {
             'login': { templateUrl:"partials/login.layout.html"},
         },
   })
   .state('login.entrar', {
       url: '/login',
       templateUrl : 'partials/login.html',
       controller : 'UserController'

   })
   .state('login.cadastro', {
       url: '/cadastro',
       templateUrl : 'partials/signup.html',
       controller : 'UserController'
   })


   /*
    * Dashboard
    */
   .state('dashboard', {
         abstract: true,
          views: {
             'dashboard': { templateUrl:"partials/dashboard.layout.html"},
         }
   })
   .state('dashboard.index', {
       url: '/dashboard',
       templateUrl : 'partials/dashboard.index.html',

   });


        $urlRouterProvider.otherwise("/login");

    }) ;
