(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('StepEntryDialogController', StepEntryDialogController);

    /* @ngInject */
    function StepEntryDialogController($scope, step, $mdDialog, $rootScope,
      $window, $timeout, $mdToast ) {
        var vm = this;
        vm.step = step;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.order = {};
        vm.total = 0;
        vm.order.user = $rootScope.user;
        vm.printClick = printClick;
        vm.status = 'idle';  // idle | uploading | complete
        vm.upload = upload;
        vm.items = [{name :'Incrição', value: vm.step.entryValue },
                    {name:'Alugel do SICard', value: vm.step.siCardValue},
                    {name: 'Anuidade', value: vm.step.annuityValue}]


        function total(){
          for (var item in vm.items) {
              vm.total += vm.items[item].value;
          }
        }
        function okClick() {
            $mdDialog.hide();
        }

        function cancelClick() {
            $mdDialog.cancel();
        }

        function printClick() {
            $window.print();
        }


        ////////////////
        var fileList;
        function upload($files) {
            if($files !== null && $files.length > 0) {
                fileList = $files;

                uploadStarted();

                $timeout(uploadComplete, 4000);
            }
        }

        function uploadStarted() {
            vm.status = 'uploading';
        }

        function uploadComplete() {
            vm.status = 'complete';
            var message = 'Thanks for ';
            for(var file in fileList) {
                message += fileList[file].name + ' ';
            }
            $mdToast.show({
                template: '<md-toast><span flex>' + message + '</span></md-toast>',
                position: 'bottom right',
                hideDelay: 5000
            });

            $timeout(uploadReset, 3000);
        }

        function uploadReset() {
            vm.status = 'idle';
        }

        total();
    }
})();
