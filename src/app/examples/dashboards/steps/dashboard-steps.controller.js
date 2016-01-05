(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('DashboardStepsController', DashboardStepsController);

    /* @ngInject */
    function DashboardStepsController($scope, $timeout, $mdToast, $rootScope,
       $state, CompetitionInstance, $mdDialog) {
         var vm = this;
         vm.competitions = [];
         vm.compSelected = null;
         vm.loadCompetition = loadCompetition;
         vm.addStep = addStep;

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

               }, function() {

               });
         }


         function loadCompetition() {
           CompetitionInstance.query().$promise.then(function(comps){
             vm.competitions = comps;
           });
         }

         loadCompetition();
    }
})();
