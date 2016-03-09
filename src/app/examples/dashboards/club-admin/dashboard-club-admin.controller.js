(function() {
  'use strict';

  angular
    .module('app.fop.dashboards')
    .controller('DashboardClubAdminController', DashboardClubAdminController);

  /* @ngInject */
  function DashboardClubAdminController($state, $cookies, $scope, $q,
    LoadData, $filter, $mdDialog, toastr, EntryInstance, API_CONFIG,
    SalesService, UserInstance, $rootScope, $http, CompetitionInstance,
    StepInstance) {
    console.log('DashboardClubAdminController');
    var vm = this;
    vm.activateUser = activateUser;
    vm.loadEntries = loadEntries;
    vm.openUser = openUser;
    vm.editEntry = editEntry;
    vm.clubUsers = []
    vm.queryFilter = "";
    vm.entries = [];
    vm.step = {}
    vm.club = {}

    if ($rootScope.user) {

      $http.get(API_CONFIG.url + "/club/admin/" + $rootScope.user._id)
        .success(function(res) {
          if (res) {
            vm.club = res;
            $http.get(API_CONFIG.url + "/users/club/" + vm.club._id)
              .success(function(users) {
                vm.clubUsers = users;
                vm.clubsQtd = users.length;
                loadCompetitions();
              }).error(function(error) {
                console.log(error);
              });
          }
        }).error(function(error) {
          console.log(error);
        });
    } else {
      $state.go()
    }

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

    function editEntry(entry, $event) {
      $mdDialog.show({
          controller: 'EditEntryClubDialogController',
          controllerAs: 'vm',
          templateUrl: 'app/examples/dashboards/club-admin/edit-entry-club-dialog.tmpl.html',
          targetEvent: $event,
          locals: {
            step: vm.step,
            order: entry
          },
          clickOutsideToClose: true
        })
        .then(function(entry) {
          loadCompetitions();
        }, cancelDialog);

      function cancelDialog() {
        vm.alert = 'You cancelled the dialog.';
      }
    }

    function activateUser(user) {
      delete user.password;
      user = new UserInstance(user);
      user.$save().then(function(user) {

        if (user.isClubAutorization) {
          toastr.success('Liberado pelo clube', user.name);
        } else {
          toastr.error('Bloqueado pelo o clube', user.name);
        }
      }).catch(function(e) {
        console.log(e);
      })
    }

    function loadCompetitions() {
      CompetitionInstance.query().$promise.then(function(comps) {
        vm.competitions = comps;
        vm.competition = vm.competitions[0]
        vm.step = vm.competition.steps[0]
        loadEntries();
      })
    }

    function loadEntries() {
      var listIds = [];
      angular.forEach(vm.clubUsers, function(value, key) {
        this.push(value._id);
      }, listIds);
      $http.get(API_CONFIG.url + "/entry/users/step/", {
          params: {
            step: vm.step._id,
            users: listIds
          }
        })
        .success(function(entries) {
          console.log(entries);
          vm.entries = entries;
        }).error(function(error) {
          console.log(error);
        });
    }

    function createData() {
      EntryInstance.query().$promise.then(function(entries) {
        var temp = []
        angular.forEach(entries, function(value, key) {
          if (value.user.club === vm.club._id && value.status == "Aceita") {
            this.push(value);
          }
        }, temp);
        vm.entriesByClub = temp.length;
      })
    }


    createData();


  }
})();
