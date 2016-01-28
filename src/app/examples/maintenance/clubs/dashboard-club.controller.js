(function() {
    'use strict';

    angular
        .module('app.fop.maintenance')
        .controller('DashboardClubsController', DashboardClubsController);

    /* @ngInject */
    function DashboardClubsController($scope, $timeout, $mdMedia,
      $mdToast, $rootScope, ClubInstance, $state, $mdDialog) {
      var vm = this;
      vm.getClubs = getClubs;
      vm.editClub = editClub;
      vm.removeClub = removeClub;
      vm.clubs = [];

      vm.query = {
         filter: '',
         limit: '5',
         order: 'name',
         page: 1
       };
      vm.selected = [];
      vm.Club = {};
      vm.Clubs = [];
      vm.filter = {
         options: {
             debounce: 500
         }
      };

    $rootScope.$on('clubEvent', function(){
      getClubs();
    });

////////////////

function editClub(club, $event) {
      $mdDialog.show({
        controller: 'EditClubDialogController',
        controllerAs: 'vm',
        templateUrl: 'app/examples/maintenance/clubs/edit-club-dialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        locals: {
                  'club': club
              },
        clickOutsideToClose: true
      })
      .then(function() {
         getClubs();
      }, function() {

      });
}

function removeClub(club, $event) {
      var confirm = $mdDialog.confirm({
            title: 'Deseja excluir a competição?',
            content: 'Todas as etapas deste compeonato serão apagadas...',
            ariaLabel: 'Lucky day',
            ok: 'Excluir',
            cancel: 'Cancelar',
            targetEvent: $event
        });
        $mdDialog.show(confirm).then(function() {
            club.$delete().then(function(resp) {
              console.log("Deletado")
              getClubs();
            })
        }, function() {
            console.log( 'You decided to keep your debt.');
        });;

}


function getClubs(){
 ClubInstance.query().$promise
  .then(function(list){
    vm.clubs = list;
  });
}

function removeFilter() {
   vm.filter.show = false;
   vm.query.filter = '';

   if(vm.filter.form.$dirty) {
       vm.filter.form.$setPristine();
   }
}
getClubs();
}
})();
