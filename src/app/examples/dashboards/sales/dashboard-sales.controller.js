(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('DashboardSalesController', DashboardSalesController);

    /* @ngInject */
    function DashboardSalesController($state, $cookies, $scope, $q, $rootScope,
      CompetitionInstance, LoadData, $interval, $mdToast, $filter, $mdDialog,
      SalesService, triMenu) {
        var vm = this;
        vm.loadGraph = loadGraph;
        console.log('DashboardSalesController');

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

        vm.openOrder = openOrder;

        /////////////////////////////////

        function openOrder(order, $event) {
            $mdDialog.show({
                controller: 'SalesOrderDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/examples/dashboards/sales/order-dialog.tmpl.html',
                locals: {
                    order: order
                },
                targetEvent: $event
            });
        }

        function loadCompetitions(){
          CompetitionInstance.query().$promise.then(function(comps){
            console.log(comps)
            vm.competitions = comps;
            vm.competition = vm.competitions[0]
            vm.step = vm.competition.steps[0]
            createData();
          })
        }

        loadCompetitions();

        function createData() {
            // vm.salesData = SalesService.generateSales(vm.dateRange);
            vm.chartLineData = SalesService.createLineChartData(vm.competition);
            // vm.chartPieData = SalesService.createPieChartData(vm.salesData);
            // vm.chartBarData = SalesService.createBarChartData(vm.salesData);
        }

        function loadGraph() {
          console.log("changed")
          createData();
        }

        // events

        // $scope.$on('salesChangeDate', function(event, $event) {
        //     $mdDialog.show({
        //         controller: 'DateChangeDialogController',
        //         controllerAs: 'vm',
        //         templateUrl: 'app/examples/dashboards/sales/date-change-dialog.tmpl.html',
        //         locals: {
        //             range: vm.dateRange
        //         },
        //         targetEvent: $event
        //     })
        //     .then(function() {
        //         // create new data
        //         createData();
        //
        //         // pop a toast
        //         $mdToast.show(
        //             $mdToast.simple()
        //             .content($filter('translate')('DASHBOARDS.SALES.DATE-UPDATED'))
        //             .position('bottom right')
        //             .hideDelay(2000)
        //         );
        //     });
        // });

        // init


    }
})();
