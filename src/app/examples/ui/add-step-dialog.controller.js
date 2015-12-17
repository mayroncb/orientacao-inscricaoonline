(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('AddStepDialogController', AddStepDialogController);

    /* @ngInject */
    function AddStepDialogController($scope, triTheming) {
      console.log('AddStepDialogController');
      $scope.answer = answer;


      function answer(res) {
        console.log( ":::::: ",res);
      }



    }
})();
