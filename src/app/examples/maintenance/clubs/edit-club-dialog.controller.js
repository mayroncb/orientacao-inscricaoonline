(function() {
    'use strict';

    angular
        .module('app.fop.maintenance')
        .controller('EditClubDialogController',
        EditClubDialogController);

    /* @ngInject */
    function EditClubDialogController($log, $scope, triTheming, $timeout, $q,
      ClubInstance,  toastr, $mdDialog, $rootScope, LoadData, UserInstance, club) {
      console.log('EditClubDialogController');
      var vm = this;
      vm.club = new ClubInstance(club);
      vm.editClub = editClub;
      vm.closeDialog = closeDialog;
      vm.newUser = newUser;
      vm.states = [];
      vm.users = [];
      vm.selectedItem = vm.club.admin;

      function editClub(club) {
        club.admin = vm.selectedItem;
        vm.club.$save().then(function() {
        toastr.success(club.name, 'Clube alterado com sucesso!');
        $rootScope.$broadcast('clubEvent', true);
        $mdDialog.hide();
        }).catch(function(erro){
            console.log(erro);
            toastr.error("Problema ao adicionar clube");
        });
      }

      function closeDialog(){
        $mdDialog.hide();
      }

      function newUser() {
        console.log(user, "<<<<<");
      }




       vm.searchTextChange = function (text) {
        var deferred = $q.defer();
        try {
          LoadData.userByName.query({text: text}, function(data){
            deferred.resolve(data);
          });
        } catch(e){
          deferred.reject(e);
        }
        return  deferred.promise;
      };

      vm.states = LoadData.states.query();

      vm.selectedItemChange = selectedItemChange;
      function selectedItemChange(item) {
        $log.info('Item changed to ', item);
      }


    }
})();
