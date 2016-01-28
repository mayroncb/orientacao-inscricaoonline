(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('EditCompetitionDialogController',
        EditCompetitionDialogController);

    /* @ngInject */
    function EditCompetitionDialogController($scope, triTheming,
      CompetitionInstance,  toastr, $mdDialog, competition) {
      console.log('EditCompetitionDialogController');
      $scope.editCompetition = editCompetition;
      $scope.closeDialog = closeDialog;
      $scope.competition = competition;

      function editCompetition(comp) {

        $scope.competition.$save().then(function(comp) {
            toastr.success('Campeonato alterado com sucesso.');
            $mdDialog.hide();
        }).catch(function(erro){
            console.log(erro);
            toastr.error("Erro ao alterar Campeonato!");
        });
      //   $scope.competition.$save().then(function(){
      //   toastr.success('Campeonato cadastrado com sucesso!', comp.name);
      //   $mdDialog.hide();
      //   }).catch(function(erro){
      //       console.log(erro);
      //       toastr.error("Problema ao adicionar campeonato");
      //   });
      }

      function closeDialog(){
        $mdDialog.cancel();
      }

    }
})();
