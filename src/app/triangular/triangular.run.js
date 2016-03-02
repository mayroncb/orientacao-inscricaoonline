(function() {
    'use strict';

    angular
        .module('triangular')
        .run(runFunction);

    /* @ngInject */
    function runFunction($rootScope, $window, amMoment,
      $state, UserInstance, $cookies) {
        amMoment.changeLocale('pt-br');
        if ($cookies.getAll()['u']) {
          UserInstance.get({id: $cookies.getAll()['u']}, function(user) {
            $rootScope.user = user;
           })
        }
        if($window.navigator.platform.indexOf('Win') !== -1) {
            $rootScope.bodyClasses = ['os-windows'];
        }

  }
})();
