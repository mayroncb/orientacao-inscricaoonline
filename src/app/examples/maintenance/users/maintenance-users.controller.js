(function() {
    'use strict';

    angular
        .module('app.fop.maintenance')
        .controller('MaintenanceUsersController', MaintenanceUsersController);

    /* @ngInject */
    function MaintenanceUsersController($scope, $timeout, $mdToast, $rootScope,
      $state, UserInstance, toastr, $mdDialog, API_CONFIG) {
        var vm = this;
        vm.users = [];
        loadUsers();
        vm.activateUser = activateUser;
        vm.removeUser = removeUser;
        vm.openEditUser = openEditUser;
        vm.openChangePass = openChangePass;


        function loadUsers() {
            vm.users = UserInstance.query()
        }

        $rootScope.$on('userEvent', function(){
          loadUsers();
        });

        function activateUser(user) {
          delete user.password;
          user.$save().then(function(user) {
            console.log(user);
            if(user.isActive){
              toastr.success('Liberado para acessar o sistema!', user.name);
            } else {
              toastr.error('Bloqueado para acessar o sistema', user.name);
            }
          }).catch(function(e){
            console.log(e);
          })
        }

        function removeUser(user, $event) {
              var confirm = $mdDialog.confirm({
                    title: 'Deseja excluir o usuário?',
                    content: 'Todos os dados desse usuário serão perdidos!',
                    ariaLabel: 'Remover Usuário',
                    ok: 'Excluir',
                    cancel: 'Cancelar',
                    targetEvent: $event
                });
                $mdDialog.show(confirm).then(function() {
                    user.$delete().then(function(resp) {
                      toastr.success('Usuário removido com sucesso', user.name);
                      loadUsers();
                    })
                }, function() {
                    console.log( 'You decided to keep your debt.');
                });;

        }

        function openChangePass(user, $event) {
              $mdDialog.show({
                controller: 'ChangePassDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/examples/maintenance/users/change-pass-dialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                locals: {
                          'user': user
                      },
                clickOutsideToClose: true
              })
              .then(function() {
                // loadUsers();
              }, function() {
                // loadUsers();
              });
        }
        function openEditUser(user, $event) {
              $mdDialog.show({
                controller: 'EditUserController',
                controllerAs: 'vm',
                templateUrl: 'app/examples/maintenance/users/edit-user-dialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                locals: {
                          'user': user
                      },
                clickOutsideToClose: true
              })
              .then(function() {
                loadUsers();
              }, function() {
                // loadUsers();
              });
        }


        vm.query = {
           filter: '',
           limit: '10',
           order: 'name',
           page: 1
         };

    }
})();
