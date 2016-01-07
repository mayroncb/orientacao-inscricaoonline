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
         vm.editStep = editStep;
         vm.removeStep = removeStep;


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

         function editStep(step, $event) {
           step.stepDate = $filter('date')(step.stepDate, "dd/MM/yyyy", "");
           step.entryStartDate = $filter('date')(step.entryStartDate, "dd/MM/yyyy", "");
           step.entryEndDate = $filter('date')(step.entryEndDate, "dd/MM/yyyy", "");
          //  console.log(vm.compSelected);
           $mdDialog.show({
             controller: 'EditStepDialogController',
             controllerAs: 'vm',
             templateUrl: 'app/examples/dashboards/steps/edit-step-dialog.tmpl.html',
             parent: angular.element(document.body),
             targetEvent: $event,
             locals: {
                       'step': step,
                       'competition': vm.compSelected
                   },
             clickOutsideToClose: true
           })
           .then(function() {
             loadCompetition();
           }, function() {
             loadCompetition();
           });
         }
         function removeStep(step, $event) {
           step = new StepInstance(step);
           console.log(step);
           var confirm = $mdDialog.confirm({
                 title: 'Excluir a etapa',
                 content: 'Tem certeza que deseja excluir a etapa?',
                 ariaLabel: 'Excluir etapa',
                 ok: 'Excluir',
                 cancel: 'Cancelar',
                 targetEvent: $event
             });
             $mdDialog.show(confirm).then(function() {
                 step.$delete().then(function(resp) {
                   console.log("Deletado")
                   loadCompetition();
                 })
             }, function() {
                 console.log( 'You decided to keep your debt.');
             });;
         }


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
