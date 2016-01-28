(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('EditEntryDialogController', EditStepEntryDialogController);

    /* @ngInject */
    function EditStepEntryDialogController($scope, step, $mdDialog, $rootScope,
        $timeout, EntryInstance, order, $mdToast, LoadData, $filter, $http, toastr) {
        var vm = this;
        var tmp;
        vm.step = step;
        vm.showTootip = true;
        vm.editEntry = editEntry;
        vm.order = order;
        vm.categories = [];
        vm.cancelClick = cancelClick;
        vm.order.value = 0;
        vm.user = vm.order.user;
        vm.status = 'Enviar';  // Enviar | Enviando | Completo
        vm.upload = upload;
        // vm.order.items = [{name :'Inscrição', value: vm.step.entryValue },
        //             {name:'Alugel do SICard', value: vm.step.siCardValue},
        //             {name: 'Anuidade', value: vm.step.annuityValue}]

        $scope.$watch('vm.comp', function() {
          if (vm.comp) {
            vm.showTootip = false;
          } else {
            vm.showTootip = true;
          }
        });

        $http({
          method: 'GET',
          url: 'http://localhost:3000/status'
        }).then(function successCallback(response) {
            vm.statusList = response.data;
            }, function errorCallback(response) {
        });

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
          order.$save().then(function(order) {
              toastr.success('Inscrição alterada com sucesso');
              $mdDialog.hide(order);
          }).catch(function(erro){
              console.log(erro);
          })
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
