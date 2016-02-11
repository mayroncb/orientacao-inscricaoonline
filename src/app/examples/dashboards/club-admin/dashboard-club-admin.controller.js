(function() {
    'use strict';

    angular
        .module('app.fop.dashboards')
        .controller('DashboardClubAdminController', DashboardClubAdminController);

    /* @ngInject */
    function DashboardClubAdminController($state, $cookies, $scope, $q,
      LoadData, $filter, $mdDialog, toastr, EntryInstance, API_CONFIG,
      SalesService, UserInstance, $rootScope, $http) {
        console.log('DashboardClubAdminController');
        var vm = this;
        vm.activateUser = activateUser;
        vm.openUser = openUser;
        vm.clubUsers = []
        vm.queryFilter = "";
        vm.entries = [];
        vm.step = {}
        vm.club = {}
        console.log("CLUB ADMINN dashboard")



        $http.get(API_CONFIG.url + "/club/admin/" + $rootScope.user._id)
          .success(function(res) {
            vm.club = res;
            $http.get(API_CONFIG.url + "/users/club/" + vm.club._id)
              .success(function(users) {
                vm.clubUsers = users;
              }).error(function(error) {
                console.log(error);
              });
          }).error(function(error) {
            console.log(error);
          });

        $http.get(API_CONFIG.url + "/users/club/" + $rootScope.user.club)
          .success(function(res) {
            vm.clubsQtd = res.length;
          })
          .error(function(error) {
            console.log(error);
          });

        console.log('Ativar em produção');
            // $interval( function(){
            //
            //   if(!$cookies.getAll()['connect.sid']) {
            //       $state.go('authentication.login');
            //   }
            //
            //
            //  }, 3000);

            function openUser(user, $event) {
                  $mdDialog.show({
                    controller: 'OpenUserController',
                    controllerAs: 'vm',
                    templateUrl: 'app/examples/dashboards/club-admin/open-user-dialog.tmpl.html',
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
           limit: '5',
           order: '-date',
           page: 1
         };

         function activateUser(user) {
           delete user.password;
           user = new UserInstance(user);
           user.$save().then(function(user) {
             console.log(user);
             if(user.isClubAutorization){
               toastr.success('Liberado pelo clube', user.firstname);
             } else {
               toastr.error('Bloqueado pelo o clube', user.firstname);
             }
           }).catch(function(e){
             console.log(e);
           })
         }


        function createData() {
          EntryInstance.query().$promise.then(function(entries) {
            var temp = []
            angular.forEach(entries, function(value, key) {
              if(value.user.club === vm.club._id
                && value.status == "Aceita"){
                  this.push(value);
                  console.log(value)
              }
            }, temp);
            vm.entriesByClub = temp.length;
            vm.chartLineData = SalesService.createLineChartClub(temp);
          })

        }


        createData();


    }
})();
