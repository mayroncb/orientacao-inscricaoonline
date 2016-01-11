(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('StepsController', StepsController);

    /* @ngInject */
    function StepsController($mdDialog, triTheming, $state, $rootScope,
      $stateParams, CompetitionInstance, StepInstance, $filter) {
        var vm = this;
        vm.stepEntry = stepEntry;


       StepInstance.query().$promise.then(function(steps){
              vm.steps = steps;
              vm.activeSteps = $filter('filter')(vm.steps, {isActive: true });
              vm.oldSteps = $filter('filter')(vm.steps, {isActive: false });
              console.log(vm.activeSteps)
              console.log(vm.activeSteps)
        });


        // vm.palettes = triTheming.palettes;
        // vm.selectPalette = selectPalette;

      //   $rootScope.$on('$viewContentLoading',
      //     function(event, viewConfig){
      //         console.log(">>>>>>>>>");
      //         delete viewConfig.view;
      // });
        //
        // if( $rootScope.user && $rootScope.user.type == "ADM"){
        //   console.log("if")
        //   console.log($state);
        //   $state.go("triangular.admin-default.adm");
        // }
        // console.log(":::MMM::: " ,$rootScope.user)
        // delete $state.current.views.belowContent;
        // delete $state.$current.views['belowContent@triangular.admin-default']
        // console.log($state.$current.views.belowContent)
        // console.log($state.$current.views.belowContent)
        // console.log($state.$current.views['belowContent@triangular.admin-default'])

        // function colourRGBA(value) {
        //     var rgba = triTheming.rgba(value);
        //     return {
        //         'background-color': rgba
        //     };
        // }



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
            .then(function(answer) {
                vm.alert = 'You said the information was "' + answer + '".';
            }, cancelDialog);

            function cancelDialog() {
                vm.alert = 'You cancelled the dialog.';
            }
        }
    }
})();
