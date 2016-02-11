(function() {
    'use strict';

    angular
        .module('app.fop.dashboards')
        .controller('DashboardUserController', DashboardUserController);

    /* @ngInject */
    function DashboardUserController($state, $cookies, $scope, $q,
      CompetitionInstance, LoadData, $interval, $mdToast, $filter, $mdDialog,
      SalesService, StepInstance, EntryInstance, $rootScope, $http, API_CONFIG) {
        console.log('DashboardUserController');
        var vm = this;
        // vm.loadGraph = loadGraph;
        vm.loadEntries = loadEntries;
        // vm.loadCompetitions = loadCompetitions;
        vm.openComp = openComp;
        vm.editEntry = editEntry;
        vm.pendingEntries = [];
        vm.queryFilter = "";
        vm.entries = [];
        vm.step = {}

        $http.get(API_CONFIG.url + "/entries/userqtd/" + $rootScope.user._id)
          .success(function(res) {
            vm.entriesbyuser = res.value;
          })
          .error(function(error) {
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


        vm.dateRange = {
            start: moment().startOf('week'),
            end: moment().endOf('week')
        };



        vm.query = {
           filter: '',
           limit: '5',
           order: '-date',
           page: 1
         };

        function openComp(comp, $event) {
          $mdDialog.show({
              controller: 'CompUserDialogController',
              controllerAs: 'vm',
              templateUrl: 'app/examples/dashboards/user/comp-dialog.tmpl.html',
              clickOutsideToClose: true,
              focusOnOpen: false,
              targetEvent: $event,
              locals: {
                  comp: comp
              }
          });
        }

        function editEntry(entry, $event) {
            $mdDialog.show({
                controller: 'ShowEntryDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/examples/dashboards/user/show-entry-step-dialog.tmpl.html',
                targetEvent: $event,
                locals: {
                    step: vm.step,
                    order: entry
                },
                clickOutsideToClose: true
            })
            .then(function(entry) {
            }, cancelDialog);

            function cancelDialog() {
                vm.alert = 'You cancelled the dialog.';
            }
        }

        // function loadCompetitions() {
        //   CompetitionInstance.query().$promise.then(function(comps){
        //     vm.competitions = comps;
        //     vm.competition = vm.competitions[0]
        //     vm.step = vm.competition.steps[0]
        //     loadEntries();
        //     createData();
        //   })
        // }

        function loadEntries() {
          $http.get(API_CONFIG.url + "/entries/user/" + $rootScope.user._id)
            .success(function(entries) {
              vm.entries = entries;
            })
            .error(function(error) {
              console.log(error);
            });

        }

        loadEntries();

        function createData() {
            vm.chartLineData = SalesService.createLineChartData(vm.competition);
        }

        function loadGraph() {
          console.log("changed")
          createData();
        }




    }
})();
