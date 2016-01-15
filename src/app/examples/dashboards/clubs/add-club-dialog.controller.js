(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('AddClubDialogController',
        AddClubDialogController);

    /* @ngInject */
    function AddClubDialogController($log, $scope, triTheming, $timeout, $q,
      ClubInstance,  toastr, $mdDialog, $rootScope, LoadData, UserInstance) {
      console.log('AddClubDialogController');
      var vm = this;
      vm.addClub = addClub;
      vm.closeDialog = closeDialog;
      vm.newUser = newUser;
      vm.states = [];
      vm.club = new ClubInstance({name: '', admin: {}, state: ''});
      vm.users = [];
      vm.selectedItem;

      function addClub(club) {
        club.admin = vm.selectedItem;
        console.log(club);
        vm.club.$save().then(function() {
        toastr.success(club.name, 'Clube cadastrado com sucesso!');
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
