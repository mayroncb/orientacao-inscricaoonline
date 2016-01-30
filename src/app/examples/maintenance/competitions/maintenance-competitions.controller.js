(function() {
    'use strict';

    angular
        .module('app.fop.maintenance')
        .controller('MaintenanceCompetitionsController', MaintenanceCompetitionsController);

    /* @ngInject */
    function MaintenanceCompetitionsController($scope, $timeout, $mdMedia,
      $mdToast, $rootScope, CompetitionInstance, $state, $mdDialog) {
      var vm = this;
      vm.getCompetitions = getCompetitions;
      vm.editCompetition = editCompetition;
      vm.removeCompetition = removeCompetition;


      vm.query = {
         filter: '',
         limit: '10',
         order: 'name',
         page: 1
       };
      vm.selected = [];
      vm.competition = {};
      vm.competitions = [];
      vm.filter = {
         options: {
             debounce: 500
         }
      };

$rootScope.$on('compEvent', function(){
  getCompetitions();
});

////////////////

function editCompetition(competition, $event, ev) {
      $mdDialog.show({
        controller: 'EditCompetitionDialogController',
        templateUrl: 'app/examples/maintenance/competitions/edit-competition-dialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals: {
                  'competition': competition
              },
        clickOutsideToClose: true
      })
      .then(function() {
         getCompetitions();
      }, function() {

      });
}

function removeCompetition(competition, $event, ev) {
      var confirm = $mdDialog.confirm({
            title: 'Deseja excluir a competição?',
            content: 'Todas as etapas deste compeonato serão apagadas...',
            ariaLabel: 'Lucky day',
            ok: 'Excluir',
            cancel: 'Cancelar',
            targetEvent: ev
        });
        $mdDialog.show(confirm).then(function() {
            competition.$delete().then(function(resp) {
              console.log("Deletado")
              getCompetitions();
            })
        }, function() {
            console.log( 'You decided to keep your debt.');
        });;

}


function getCompetitions(){
 CompetitionInstance.query().$promise
  .then(function(list){
    vm.competitions = list;
  });
}

function removeFilter() {
   vm.filter.show = false;
   vm.query.filter = '';

   if(vm.filter.form.$dirty) {
       vm.filter.form.$setPristine();
   }
}
getCompetitions();
}
})();
