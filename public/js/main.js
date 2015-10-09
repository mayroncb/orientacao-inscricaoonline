angular.module('app', ['ngRoute', 'ngResource', 'toastr', 'ui.router'])
    .config(function($urlRouterProvider, $httpProvider, $stateProvider) {

    $httpProvider.interceptors.push('interceptor');


    $stateProvider
    .state('login', {
         abstract: true,
          views: {
             'login': { templateUrl:"partials/login.layout.html"},
         },
         onEnter: function(){
              console.log("login");
            }
   })
   .state('login.entrar', {
       url: '/login',
       templateUrl : 'partials/login.html',
       controller : 'UserController',
       onEnter: function(){
              console.log("login.entrar");
            }

   })
   .state('login.cadastro', {
       url: '/cadastro',
       templateUrl : 'partials/signup.html',
       controller : 'UserController',
       onEnter: function(){
              console.log("login.cadastro");
            }
   })


   /*
    * Dashboard
    */
   .state('dashboard', {
         abstract: true,
          views: {
             'dashboard': { templateUrl:"partials/dashboard.layout.html"},
         },
         onEnter: function(){
              console.log("dashboard");
            }
   })
   .state('dashboard.index', {
       url: '/dashboard',
       templateUrl : 'partials/dashboard.index.html',
       onEnter: function(){
              console.log("dashboard.index");
            }

   })
   .state('dashboard.user', {
       url: '/user',
       templateUrl : 'partials/user.edit.html',
       onEnter: function(){
              console.log("dashboard.user.edit");
            }

   });


        $urlRouterProvider.otherwise("/login");

    }) ;
