(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('DashboardStepsController', DashboardStepsController);

    /* @ngInject */
    function DashboardStepsController($scope, $timeout, $mdToast, $rootScope,
       $state, CompetitionInstance, StepInstance, $mdDialog, $filter) {
         var vm = this;
         vm.competitions = [];
         vm.compSelected = null;
         vm.loadCompetition = loadCompetition;
         vm.addStep = addStep;


         vm.query = {
            filter: '',
            limit: '10',
            order: 'name',
            page: 1
          };

         function addStep(competition, $event) {
               $mdDialog.show({
                 controller: 'AddStepDialogController',
                 controllerAs: 'vm',
                 templateUrl: 'app/examples/dashboards/steps/add-step-dialog.tmpl.html',
                 parent: angular.element(document.body),
                 targetEvent: $event,
                 locals: {
                           'competition': competition
                       },
                 clickOutsideToClose: true
               })
               .then(function() {
                 loadCompetition();
               }, function() {
                 loadCompetition();
               });
         }

        //  $rootScope.$on('stepEvent', function(){
        //    loadCompetition();
        //  });

         function loadCompetition() {
           CompetitionInstance.query().$promise.then(function(comps){
             vm.competitions = comps;
             if (vm.compSelected) {
                vm.compSelected = $filter('filter')(vm.competitions, {_id: vm.compSelected._id })[0];
             } else {
               vm.compSelected = vm.competitions[0];
             }
           });
         }
         loadCompetition();

    }
})();
