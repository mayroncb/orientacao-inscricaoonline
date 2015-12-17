(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('StepFabController', StepFabController);

    /* @ngInject */
    function StepFabController($rootScope, $scope, $mdMedia, $mdDialog) {

      $scope.status = '  ';
      $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');


      $scope.showDialog = function(ev) {
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
          $mdDialog.show({
            controller: 'AddStepDialogController',
            templateUrl: 'app/examples/ui/add-step-dialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
          })
          .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
          }, function() {
            $scope.status = 'You cancelled the dialog.';
          });
          $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
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
