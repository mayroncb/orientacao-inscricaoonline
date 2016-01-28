(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('AddUserController', AddUserController);

    /* @ngInject */
    function AddUserController($scope, $state, $location, toastr, $http, $filter,
      triSettings, $mdDialog, LoadData, UserInstance, $rootScope) {
        var vm = this;

        vm.types = ['USER', 'ADMIN', 'CLUB_ADMIN']
        vm.closeDialog = closeDialog;
        vm.addUser = addUser;
        vm.checkConfirm = false;
        vm.user = {
            firstname: '',
            surname: '',
            rg: '',
            genre: '',
            cpf: '',
            phone: '',
            uf: {},
            cboNumber: '',
            isCbo: false,
            siCardNumber: '',
            siCard: false,
            category: '',
            club: '',
            dateBirth: '',
            email: '',
            password: '',
            confirm: '',
            allergy: []
        };
        vm.user = new UserInstance(vm.user);
        vm.categories = LoadData.categories.query(function(categories) {
            // vm.user['category'] = vm.categories[17];
        });

        vm.clubs = LoadData.clubs.query(function(clubs){

            vm.groupList = vm.clubs.reduce(function(previous, current) {
                if (previous.indexOf(current.UF) === -1) {
                  previous.push(current.UF);
                }
                return previous;
              }, []);
              // vm.user['club'] = vm.clubs[0];
        });

        vm.states = LoadData.states.query(function(states){
          vm.user['uf'] = vm.states[14];
        });

        function closeDialog(){
          $mdDialog.cancel();
        }

        function addUser(user) {
          console.log(user);
          delete vm.user.confirm;
          vm.user.$save().then(function(user) {
              toastr.success('Usuário cadastrado com sucesso', user.firstname);
              $mdDialog.hide();
              $rootScope.$broadcast('userEvent', true);
          }).catch(function(erro){
              console.log(erro);
              toastr.error("Já existe um usuário com esse " + erro.data.fieldName  + " cadastrado!", 'Erro no cadastro');
          });

        }
    }
})();
