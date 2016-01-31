(function() {
    'use strict';

    angular
        .module('app.fop.dashboards')
        .controller('OpenUserController', OpenUserController);

    /* @ngInject */
    function OpenUserController($scope, $state, $location, toastr, $http, $filter,
       $mdDialog, LoadData, UserInstance, $rootScope, user) {
        var vm = this;

        vm.types = ['USER', 'ADMIN', 'CLUB_ADMIN']
        vm.closeDialog = closeDialog;
        vm.editUser = editUser;
        vm.checkConfirm = false;
        vm.user = user;
        delete vm.user.password
        vm.user.dateBirth = $filter('date')(  vm.user.dateBirth, "dd/MM/yyyy");

        LoadData.categories.query().$promise.then(function(categories){
            vm.categories = categories;
            vm.user['category'] = $filter('filter')(vm.categories, {_id:vm.user['category']._id})[0];
        });

        LoadData.clubs.query().$promise.then(function(clubs){
            vm.clubs = clubs;
            vm.user['club'] = $filter('filter')(clubs, {_id:vm.user['club']._id})[0];

            vm.groupList = clubs.reduce(function(previous, current) {
                if (previous.indexOf(current.UF) === -1) {
                  previous.push(current.UF);
                }
                return previous;
              }, []);
              // vm.user['club'] = vm.clubs[0];
        });

        vm.states = LoadData.states.query();
        function closeDialog(){
          $mdDialog.cancel();
        }

        function editUser(user) {
          console.log(user);
          delete vm.user.confirm;
          delete vm.user.password;
          vm.user.$save().then(function(user) {
              toastr.success('Usuário alterado com sucesso', user.firstname);
              $mdDialog.hide();
              $rootScope.$broadcast('userEvent', true);
          }).catch(function(erro){
              console.log(erro);
              toastr.error("Já existe um usuário com esse " + erro.data.fieldName  + " cadastrado!", 'Erro no cadastro');
          });

        }
    }
})();
