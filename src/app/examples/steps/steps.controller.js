(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('StepsController', StepsController);

    /* @ngInject */
    function StepsController($mdDialog, triTheming, $state, $rootScope, $stateParams) {
        var vm = this;
        vm.colourRGBA = colourRGBA;
        vm.palettes = triTheming.palettes;
        vm.selectPalette = selectPalette;

      //   $rootScope.$on('$viewContentLoading',
      //     function(event, viewConfig){
      //         console.log(">>>>>>>>>");
      //         delete viewConfig.view;
      // });

        if( $rootScope.user && $rootScope.user.type == "ADM"){
          console.log("if")
          console.log($state);
          $state.go("triangular.admin-default.adm");
        }
        // console.log(":::MMM::: " ,$rootScope.user)
        // delete $state.current.views.belowContent;
        // delete $state.$current.views['belowContent@triangular.admin-default']
        // console.log($state.$current.views.belowContent)
        // console.log($state.$current.views.belowContent)
        // console.log($state.$current.views['belowContent@triangular.admin-default'])

        function colourRGBA(value) {
            var rgba = triTheming.rgba(value);
            return {
                'background-color': rgba
            };
        }



        function selectPalette($event, name, palette) {
            $mdDialog.show({
                controller: 'StepDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/examples/steps/step-dialog.tmpl.html',
                targetEvent: $event,
                locals: {
                    name: name,
                    palette: palette
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
