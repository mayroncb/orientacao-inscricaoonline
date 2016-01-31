(function() {
    'use strict';

    angular
        .module('app.fop.dashboards')
        .controller('ShowEntryDialogController', EditStepEntryDialogController);

    /* @ngInject */
    function EditStepEntryDialogController($scope, $mdDialog, $rootScope,
        StepInstance, EntryInstance, order, $mdToast, LoadData, $filter, $http, toastr) {
        var vm = this;
        var tmp;
        vm.showTootip = true;
        vm.order = order;
        vm.categories = [];
        vm.cancelClick = cancelClick;
        vm.order.value = 0;
        vm.user = vm.order.user;

        function total(){
          for (var item in vm.order.items) {
              vm.order.value += vm.order.items[item].value;
          }
        }

        StepInstance.get({id: vm.order.step}).$promise.then(function(step){
          vm.step = step;
        })

        function cancelClick() {
            $mdDialog.cancel();
        }

        total();
    }
})();
