(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('DashboardSalesController', DashboardSalesController);

    /* @ngInject */
    function DashboardSalesController($state, $cookies, $scope, $q, $rootScope,
      CompetitionInstance, LoadData, $interval, $mdToast, $filter, $mdDialog,
      SalesService, StepInstance, EntryInstance) {
        console.log('DashboardSalesController');
        var vm = this;
        vm.loadGraph = loadGraph;
        vm.loadEntries = loadEntries;
        vm.openComp = openComp;
        vm.editEntry = editEntry;
        vm.pendingEntries = [];
        vm.queryFilter = "";
        vm.entries = [];
        LoadData.clubQtd.query().$promise.then(function(data){
          vm.clubsQtd = data.value
        })
        LoadData.userQtd.query().$promise.then(function(data){
          vm.usersQtd = data.value
        })


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

        // vm.openOrder = openOrder;

        /////////////////////////////////

        // function openOrder(order, $event) {
        //     $mdDialog.show({
        //         controller: 'SalesOrderDialogController',
        //         controllerAs: 'vm',
        //         templateUrl: 'app/examples/dashboards/sales/order-dialog.tmpl.html',
        //         locals: {
        //             order: order
        //         },
        //         targetEvent: $event,
        //         clickOutsideToClose: true
        //     });
        // }

        function openComp(comp, $event){
          $mdDialog.show({
              controller: 'CompDialogController',
              controllerAs: 'vm',
              templateUrl: 'app/examples/dashboards/sales/comp-dialog.tmpl.html',
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
                controller: 'EditEntryDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/examples/dashboards/sales/edit-entry-step-dialog.tmpl.html',
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

        function loadCompetitions() {
          CompetitionInstance.query().$promise.then(function(comps){
            vm.competitions = comps;
            vm.competition = vm.competitions[0]
            vm.step = vm.competition.steps[0]
            loadEntries();
            createData();
          })
        }

        function loadEntries(){
          StepInstance.get({id: vm.step._id}, function(step){
              vm.entries = step.entries;
          })
          EntryInstance.query().$promise.then(function(entries) {
            vm.pendingEntries = $filter('filter')(entries, {status: "!Aceita"});
            // vm.pendingEntries = entries;
          })
        }

        loadCompetitions();

        function createData() {
            vm.chartLineData = SalesService.createLineChartData(vm.competition);
        }

        function loadGraph() {
          console.log("changed")
          createData();
        }

 


    }
})();
