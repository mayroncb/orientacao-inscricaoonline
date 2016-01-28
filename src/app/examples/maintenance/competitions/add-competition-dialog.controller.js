(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('AddCompetitionDialogController',
        AddCompetitionDialogController);

    /* @ngInject */
    function AddCompetitionDialogController($scope, triTheming,
      CompetitionInstance,  toastr, $mdDialog, $rootScope) {
      console.log('AddCompetitionDialogController');
      $scope.addCompetition = addCompetition;
      $scope.closeDialog = closeDialog;

      $scope.competition = new CompetitionInstance({name: ''});

      function addCompetition(comp) {
        $scope.competition.$save().then(function() {
        toastr.success('Campeonato cadastrado com sucesso!', comp.name);
        $rootScope.$broadcast('compEvent', true);
        $mdDialog.hide();
        }).catch(function(erro){
            console.log(erro);
            toastr.error("Problema ao adicionar campeonato");
        });
      }

      function closeDialog(){
        $mdDialog.hide();
      }

    }
})();
