(function() {
    'use strict';

    angular
        .module('app.fop.dashboards')
        .controller('EditEntryClubDialogController', EditEntryClubDialogController);

    /* @ngInject */
    function EditEntryClubDialogController($scope, step, $mdDialog, $rootScope, API_CONFIG,
        $timeout, EntryInstance, order, $mdToast, LoadData, $filter, $http, toastr) {
        var vm = this;
        var tmp;
        vm.step = step;
        vm.categoryChanged = false;
        vm.editEntry = editEntry;
        vm.order = order;
        vm.categories = [];
        vm.cancelClick = cancelClick;
        vm.order.value = 0;
        vm.user = vm.order.user;

        $http({
          method: 'GET',
          url: API_CONFIG.url + '/status'
        }).then(function successCallback(response) {
            vm.statusList = response.data;
            }, function errorCallback(response) {
        });

        function teste(){
          console.log("DDDDDDDD")
        }

        function total(){
          for (var item in vm.order.items) {
              vm.order.value += vm.order.items[item].value;
          }
        }

        LoadData.categories.query().$promise.then(function(categories) {
          vm.categories = categories;
          vm.order.category = $filter('filter')(vm.categories, {_id: vm.order.category._id})[0];
        })

        function editEntry(order) {
          order = new EntryInstance(order);
          console.log(order);
          order.$save().then(function(data) {
              toastr.success('Inscrição alterada com sucesso');
              $mdDialog.hide(data);
          }).catch(function(erro){
              console.log(erro);
          })
        }

        function cancelClick() {
            $mdDialog.cancel();
        }

        total();
    }
})();
