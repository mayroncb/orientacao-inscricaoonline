(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('StepEntryDialogController', StepEntryDialogController);

    /* @ngInject */
    function StepEntryDialogController($scope, step, $mdDialog, $rootScope,
      triLoaderService, UserInstance, $window, $timeout, $mdToast,
      Upload, LoadData, $filter, EntryInstance, API_CONFIG, toastr) {
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
        UserInstance.get({id: $rootScope.user._id}, function(user) {
          vm.user = user;
          validateValue();
          LoadData.categories.query().$promise.then(function(categories) {
            vm.categories = categories;
            vm.order.category =  $filter('filter')(vm.categories, {_id:vm.user['category']})[0];
          }).catch(function(erro){
              console.log(erro);
          }).finally(function(){
              vm.loading = false;
          });
        });
        vm.status = 'Anexar';  // Anexar | Anexando | Completo
        vm.upload = upload;
        vm.order.items = [{name :'Inscrição', value: vm.step.entryValue },
                    {name:'Aluguel do SICard', value: vm.step.siCardValue},
                    {name: 'Anuidade', value: vm.step.annuityValue}]

        $scope.
        $watch('vm.comp', function() {
          if (vm.comp) {
            vm.showTootip = false;
          } else {
            vm.showTootip = true;
          }
        });

        function total() {
          for (var item in vm.order.items) {
              console.log(vm.order.items[item].value);
              vm.order.value += vm.order.items[item].value;
          }
        }



        function validateValue() {
            if (vm.user.siCard) {
              vm.order.items[1].value = 1;
            }
            if(!vm.user.isFirstEntry) {
                vm.order.items.splice(2, 1);
            }
            total();
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
            }, function (error) {
              if (error.status === 409){
                toastr.error('Inconsistência nos dados!', 'Tente Novamente.');
              }
              vm.loading = false;
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


    }
})();
