(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('StepEntryDialogController', StepEntryDialogController);

    /* @ngInject */
    function StepEntryDialogController($scope, step, $mdDialog, $rootScope, triLoaderService,
      $window, $timeout, $mdToast, Upload, LoadData, $filter, EntryInstance, API_CONFIG) {
        var vm = this;
        var tmp;
        vm.step = step;
        vm.loading = true;
        vm.showTootip = true;
        vm.order = {};
        vm.categories = [];
        vm.cancelClick = cancelClick;
        vm.entryStep = entryStep;
        vm.order.value = 0;
        vm.user = $rootScope.user;
        vm.status = 'Anexar';  // Anexar | Anexando | Completo
        vm.upload = upload;
        vm.order.items = [{name :'Inscrição', value: vm.step.entryValue },
                    {name:'Alugel do SICard', value: vm.step.siCardValue},
                    {name: 'Anuidade', value: vm.step.annuityValue}]
        validateValue();
        $scope.
        $watch('vm.comp', function() {
          if (vm.comp) {
            vm.showTootip = false;
            // console.log(vm.showTootip);
          } else {
            vm.showTootip = true;
          }
        });

        function total() {
          for (var item in vm.order.items) {
              vm.order.value += vm.order.items[item].value;
          }
        }

        LoadData.categories.query().$promise.then(function(categories) {
          vm.categories = categories;
          vm.order.category =  $filter('filter')(vm.categories, {_id:vm.user['category']._id})[0];
          vm.loading = false;
        })

        function validateValue() {
            if (vm.user.siCard) {
              vm.order.items[1].value = 1;
            }
            if(!vm.user.isFirstEntry) {
                vm.order.items.splice(2, 1);
            }

        }

        function entryStep(order) {
          vm.loading = true;
          order.user = vm.user;
          order.step = vm.step;
          Upload.upload({
             url: API_CONFIG.url + '/entries/',
             method: 'POST',
             data: {file: tmp, 'order': angular.toJson(order)}
             }).then(function (resp) {
               $mdDialog.hide();
               vm.loading = false;
            }, function () {

            }
        );

        }

        function cancelClick() {
            $mdDialog.cancel();
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
            vm.status = 'Anexando';
        }

        function uploadComplete() {
            vm.status = 'Completo';
            vm.comp = tmp;
            $timeout(uploadReset, 1000);
        }

        function uploadReset() {
            vm.status = 'Anexar';
        }

        total();
    }
})();
