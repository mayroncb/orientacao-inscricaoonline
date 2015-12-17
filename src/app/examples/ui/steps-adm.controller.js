(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('StepsAdmController', StepsController);

    /* @ngInject */
    function StepsController($scope ,$mdDialog, triTheming, $state, $rootScope,  $mdMedia) {
        var vm = this;
        vm.colourRGBA = colourRGBA;
        vm.palettes = triTheming.palettes;
        vm.selectPalette = selectPalette;


        
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
                templateUrl: 'app/examples/ui/step-dialog.tmpl.html',
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
