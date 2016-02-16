(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('ForgotController', ForgotController);

    /* @ngInject */
    function ForgotController($scope, $state, $mdToast, $filter,
      $http, triSettings, API_CONFIG, toastr) {
        var vm = this;
        vm.triSettings = triSettings;
        vm.user = {
            email: ''
        };
        vm.resetClick = resetClick;

        function resetClick() {
            $http({
                method: 'GET',
                url: API_CONFIG.url + '/user/reset/'+ vm.user.email
            }).
            success(function(data) {
              toastr.success('Em brave você receberá um email com as instruções');
              $state.go('authentication.login');
            }).
            error(function(data) {
              console.log(data);
              toastr.error(data);
            });
        }
    }
})();
