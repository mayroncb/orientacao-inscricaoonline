(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('AddUserFabController', AddUserFabController);

    /* @ngInject */
    function AddUserFabController($rootScope, $scope, $mdMedia, $mdDialog) {

      $scope.customFullscreen = $mdMedia('xs') || $mdMedia('xs');

      $scope.showDialog = function(ev) {
          var useFullScreen = ($mdMedia('xs') || $mdMedia('xs'))  && $scope.customFullscreen;
          $mdDialog.show({
            controller: 'AddUserController',
            controllerAs: 'vm',
            templateUrl: 'app/examples/maintenance/users/add-user-dialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
          })
          .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
          }, function() {
            $scope.status = 'You cancelled the dialog.';
            console.log($scope.status);
          });
          $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('xs');
          }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
          });
      };


    //   function DialogController($scope, $mdDialog) {
    //     $scope.hide = function() {
    //       $mdDialog.hide();
    //     };
    //     $scope.cancel = function() {
    //       $mdDialog.cancel();
    //     };
    //     $scope.answer = function(answer) {
    //       $mdDialog.hide(answer);
    //     };
    //
    //
    // }
}
})();
