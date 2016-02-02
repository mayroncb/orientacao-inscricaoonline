(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('StepsController', StepsController);

    /* @ngInject */
    function StepsController($mdDialog, toastr, $state, $rootScope, Upload, triLoaderService,
      $stateParams, CompetitionInstance, StepInstance, $filter, $http) {
        var vm = this;
        vm.stepEntry = stepEntry;
        vm.steps = [];
        vm.activeSteps = [];
        vm.oldSteps = [];
        // vm.isRegistered = false;
        vm.loading = true;
        function loadSteps() {
          StepInstance.query().$promise.then(function(steps){
                 vm.steps = steps;
                 vm.activeSteps = $filter('filter')(vm.steps, {isActive: true });
                 vm.oldSteps = $filter('filter')(vm.steps, {isActive: false });

                checkEntries();
           });
        }


        function checkEntries() {

          $http.get("http://localhost:3000/entries/user/"+$rootScope.user._id)
            .success(function(entries) {
              angular.forEach(entries, function(entry, key) {
                angular.forEach(vm.activeSteps, function(step, key) {
                  if (entry.step === step._id && entry.status !== "Cancelada") {
                    step.isRegistered = true
                  }
                }, null);
              }, null);
                vm.loading = false;
            })
            .error(function(error) {
              console.log(error);
            });
        }
        loadSteps();
        triLoaderService.setLoaderActive(true)

        function stepEntry($event, step) {
            $mdDialog.show({
                controller: 'StepEntryDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/examples/steps/entry-step-dialog.tmpl.html',
                targetEvent: $event,
                locals: {
                    step: step
                },
                clickOutsideToClose: true
            })
            .then(function(step) {
              toastr.warning('Aguarde a confirmação', 'Inscrição enviada!');
              loadSteps();
            }, cancelDialog);

            function cancelDialog() {
                vm.alert = 'You cancelled the dialog.';
            }
        }
    }
})();
