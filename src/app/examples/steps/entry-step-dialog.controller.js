(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('StepEntryDialogController', StepEntryDialogController);

    /* @ngInject */
    function StepEntryDialogController($scope, step, $mdDialog, $rootScope,
      $window, $timeout, $mdToast, Upload ) {
        var vm = this;
        var tmp;
        vm.step = step;
        vm.showTootip = true;
        vm.order = {};
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.order.total = 0;
        vm.user = $rootScope.user;
        vm.status = 'Enviar';  // Enviar | Enviando | Completo
        vm.upload = upload;
        vm.order.items = [{name :'Inscrição', value: vm.step.entryValue },
                    {name:'Alugel do SICard', value: vm.step.siCardValue},
                    {name: 'Anuidade', value: vm.step.annuityValue}]

        $scope.
        $watch('vm.comp', function() {
          if (vm.comp) {
            vm.showTootip = false;
            console.log(vm.showTootip);
          } else {
            vm.showTootip = true;
          }
        });

        function total(){
          for (var item in vm.order.items) {
              vm.order.total += vm.order.items[item].value;
          }
        }
        function okClick(order) {
          order.user = vm.user;
          Upload.upload({
             url: 'http://localhost:3000/steps/entry/' + vm.step._id,
             method: 'POST',
             data: {file: tmp, 'order': angular.toJson(order)}
             }).then(function (resp) {
               $mdDialog.hide();
            }, function () {

            }
        );

        }

        function cancelClick() {
            $mdDialog.cancel();
        }

        function printClick() {
            $window.print();
        }

        ////////////////
        function upload($file) {
             if($file !== null) {
                tmp = $file;
                uploadStarted();
                $timeout(uploadComplete, 2000);
            }
        }

        function uploadStarted() {
            vm.status = 'Enviando';
        }

        function uploadComplete() {
            vm.status = 'Completo';
            vm.comp = tmp;
            $timeout(uploadReset, 1000);
        }

        function uploadReset() {
            vm.status = 'Enviar';
        }

        total();
    }
})();
