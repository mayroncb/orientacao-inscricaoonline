(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('ProfileController', ProfileController);

    /* @ngInject */
    function ProfileController($scope, $rootScope, LoadData, $filter, toastr, UserInstance, $cookies ) {
        console.log('ProfileController');



        var vm = this;
        vm.user =  new UserInstance($rootScope.user);
        vm.updateUser = updateUser;
        vm.categories = [];
        vm.states = [];
        vm.clubs = [];
        delete vm.user.password;
        function updateUser() {
          vm.user.uf = vm.user.uf.UF;
          console.log(vm.user.uf);
          vm.user.$save().then(function(user) {
              toastr.success('Usuário alterado com sucesso.');
              vm.user = new UserInstance(user);
              delete vm.user.password;
          }).catch(function(erro){
              console.log(erro);
              toastr.error("Erro ao alterar usuario!");
          });
        }

        $scope.$watch('vm.user', function() {
            console.log('$watch :::::');

            vm.user.dateBirth = $filter('date')(  vm.user.dateBirth, "dd/MM/yyyy");
            $rootScope.user = vm.user;
            loadData();
        });

        function loadData() {
          vm.categories = LoadData.categories.query(function(categories) {
              vm.user['category'] = $filter('filter')(categories, {_id:vm.user['category']})[0];
              console.log('categories:: ', categories[0]);
          });

          vm.clubs = LoadData.clubs.query(function(clubs) {
              vm.groupList = vm.clubs.reduce(function(previous, current) {
                  if (previous.indexOf(current.UF) === -1) {
                    previous.push(current.UF);
                  }
                  return previous;
                }, []);
                vm.user['club'] = $filter('filter')(clubs, {_id:vm.user['club']})[0];
                console.log('club:: ', clubs[0]);
          });

          vm.states = LoadData.states.query(function(states){
            vm.user['uf'] = $filter('filter')(states, {UF:vm.user['uf']})[0];
            console.log('states:: ', states[0]);
          });
        }
    }
})();
