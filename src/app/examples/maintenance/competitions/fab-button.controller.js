(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('CompetitionsFabController', CompetitionsFabController);

    /* @ngInject */
    function CompetitionsFabController($rootScope, $scope, $mdMedia, $mdDialog, API_CONFIG) {

      $scope.customFullscreen = $mdMedia('xs') || $mdMedia('xs');

      $scope.showDialog = function(ev) {
          var useFullScreen = ($mdMedia('xs') || $mdMedia('xs'))  && $scope.customFullscreen;
          $mdDialog.show({
            controller: 'AddCompetitionDialogController',
            templateUrl: 'app/examples/maintenance/competitions/add-competition-dialog.tmpl.html',
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
}
})();
