(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('ProfileController', ProfileController);

    /* @ngInject */
    function ProfileController($scope, $rootScope, LoadData, $filter,
      toastr, UserInstance, $cookies ) {
        console.log('ProfileController');
        var vm = this;
        vm.user =  new UserInstance($rootScope.user);
        vm.avatar = vm.user.genre ? "assets/images/avatars/avatar-5.png":"assets/images/avatars/avatar-2.png"
        vm.user.dateBirth = $filter('date')(  vm.user.dateBirth, "dd/MM/yyyy");
        vm.updateUser = updateUser;
        vm.changePass = changePass;
        vm.categories = [];
        vm.states = [];
        vm.clubs = [];
        vm.loading = true;

        delete vm.user.password;
        function updateUser() {
          vm.loading = true;
          delete vm.user.password
          delete vm.user.confirm
          vm.user.uf = vm.user.uf.UF;
          vm.user.$save().then(function(user) {
              toastr.success('Usuário alterado com sucesso.');
              vm.user = new UserInstance(user);
              $rootScope.user = vm.user;
              vm.user.dateBirth = $filter('date')(  vm.user.dateBirth, "dd/MM/yyyy");
          }).catch(function(erro){
              console.log(erro);
              toastr.error("Erro ao alterar usuario!");
          }).finally(function(){
              loadData();
              delete vm.user.password
              delete vm.user.confirm
              vm.loading = false;
          });

        }

        function changePass() {
          vm.loading = true;
          vm.user.uf = vm.user.uf.UF
           vm.user.$save().then(function(user) {
              toastr.success('Senha alterada com sucesso.');
              vm.user = new UserInstance(user);
          }).catch(function(erro){
              console.log(erro);
              toastr.error("Erro ao alterar senha!");
          }).finally(function(){
              delete vm.user.password
              delete vm.user.confirm
              vm.loading = false;
          }) ;
        }

        // $scope.$watch('vm.user', function() {
        //     console.log('$watch :::::');
        //     vm.user.dateBirth = $filter('date')(  vm.user.dateBirth, "dd/MM/yyyy");
        //     $rootScope.user = vm.user;
        // });
        loadData()
        function loadData() {
          LoadData.categories.query().$promise.then(function(categories) {
              vm.categories = categories;
              vm.user['category'] = $filter('filter')(categories, {_id:vm.user['category']})[0];
          });

           LoadData.clubs.query().$promise.then(function(clubs) {
             vm.clubs = clubs;
              vm.groupList = vm.clubs.reduce(function(previous, current) {
                  if (previous.indexOf(current.UF) === -1) {
                    previous.push(current.UF);
                  }
                  return previous;
                }, []);
                vm.loading = false;
                vm.user['club'] = $filter('filter')(clubs, {_id:vm.user['club']})[0];
          });

         LoadData.states.query().$promise.then(function(states){
            vm.states = states
            vm.user['uf'] = $filter('filter')(states, {UF:vm.user['uf']})[0];
          });
        }
    }
})();
