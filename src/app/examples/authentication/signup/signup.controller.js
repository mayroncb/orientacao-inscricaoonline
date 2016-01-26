(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('SignupController', SignupController);

    /* @ngInject */
    function SignupController($scope, $state, $location, toastr, $http, $filter,
      triSettings, API_CONFIG, LoadData, UserInstance) {
        var vm = this;


        vm.triSettings = triSettings;
        vm.signupClick = signupClick;
        vm.teste = teste;
        vm.checkConfirm = false;
        vm.user = {
            firstname: '',
            surname: '',
            rg: '',
            genre: '',
            cpf: '',
            phone: '',
            uf: null,
            cboNumber: '',
            isCbo: false,
            siCardNumber: '',
            siCard: false,
            category: '',
            club: {},
            dateBirth: '',
            email: '',
            password: '',
            confirm: '',
            allergy: []
        };
        vm.user = new UserInstance(vm.user);
        vm.categories = LoadData.categories.query(function(categories) {
            vm.user['category'] = vm.categories[17];
        });

        vm.clubs = LoadData.clubs.query(function(clubs){

            vm.groupList = vm.clubs.reduce(function(previous, current) {
                if (previous.indexOf(current.UF) === -1) {
                  previous.push(current.UF);
                }
                return previous;
              }, []);
              vm.user['club'] = vm.clubs[0];
        });

        vm.states = LoadData.states.query(function(states){
          vm.user['uf'] = vm.states[14].UF;
        });

        function signupClick() {
          vm.user.type = "USER";
          // delete vm.user.confirm;
          vm.user.$save().then(function(user) {
              toastr.success('Usuário cadastrado com sucesso', user.firstname);
              // $location.path('/login');
              $state.go('authentication.login');

          }).catch(function(erro){
            console.log(erro)
            if(erro.data.errors) {
              var errors = Object.keys(erro.data.errors);
              if (erro.data.fieldName){

              } else if (errors[0] === "dateBirth" ) {
                toastr.error("Por favor verifique sua data de nascimento, tem algo errado com ela");
              }
            } else if (erro.data.fieldName) {
              toastr.error("Já existe um usuário com esse " + erro.data.fieldName  + " cadastrado!", 'Erro no cadastro');
            }
          });


        }
        function teste() {

              // $state.go('authentication.login');
               $location.path('/login');



        }
    }
})();
