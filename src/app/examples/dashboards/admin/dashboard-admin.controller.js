(function() {
    'use strict';

    angular
        .module('app.fop.dashboards')
        .controller('DashboardSalesController', DashboardSalesController);

    /* @ngInject */
    function DashboardSalesController($state, $cookies, $scope, $q, $rootScope,
      CompetitionInstance, LoadData, $interval, $mdToast, $filter, $mdDialog,
      SalesService, StepInstance, EntryInstance, API_CONFIG) {
        var vm = this;
        vm.loading = true;
        vm.loadGraph = loadGraph;
        vm.loadEntries = loadEntries;
        vm.loadCompetitions = loadCompetitions;
        vm.openComp = openComp;
        vm.editEntry = editEntry;
        vm.pendingEntries = [];
        vm.queryFilter = "";
        vm.entries = [];
        vm.step = {}
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

        function openComp(comp, $event){
          $mdDialog.show({
              controller: 'CompDialogController',
              controllerAs: 'vm',
              templateUrl: 'app/examples/dashboards/admin/comp-dialog.tmpl.html',
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
                templateUrl: 'app/examples/dashboards/admin/edit-entry-step-dialog.tmpl.html',
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

          StepInstance.get({id: vm.step._id}, function(step) {
            vm.entries = []
            if (step.entries.length > 0) vm.entries = step.entries;
          })
          EntryInstance.query().$promise.then(function(entries) {
            vm.pendingEntries = [ ]
            vm.tempList = $filter('filter')(entries, {status: "!Aceita"})
            if (vm.tempList.length > 0 ){
              vm.pendingEntries = vm.tempList
              }
              vm.loading = false;
          }).catch(function(err){
              console.log(err);
              vm.loading = false;
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
