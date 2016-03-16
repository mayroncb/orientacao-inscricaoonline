(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($cookies, $state, toastr, $rootScope,
      triSettings, LoginService, $scope, $timeout) {
        var vm = this;
        vm.loginClick = loginClick;
        vm.socialLogins = [{
            icon: 'fa fa-twitter',
            color: '#5bc0de',
            url: '#'
        },{
            icon: 'fa fa-facebook',
            color: '#337ab7',
            url: '#'
        },{
            icon: 'fa fa-google-plus',
            color: '#e05d6f',
            url: '#'
        },{
            icon: 'fa fa-linkedin',
            color: '#337ab7',
            url: '#'
        }];
        vm.triSettings = triSettings;
        // create blank user variable for login form
        vm.user = {
            email: '',
            password: ''
        };

        function loginClick() {
          var promise = LoginService.login({'name': vm.user.email, 'pass': vm.user.password }).$promise;

          promise.then(function(user) {
            $cookies.put("u", user._id );
              $rootScope.user = user;
              $state.go('triangular.admin-default.dashboard')
          }, function(erro){
              toastr.error("Login ou senha inválido")
          })
        }
    }
})();
