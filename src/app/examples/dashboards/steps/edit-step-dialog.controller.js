(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('EditStepDialogController',
        EditStepDialogController);

    /* @ngInject */
    function EditStepDialogController($scope, triTheming, LoadData, moment,
      StepInstance,  toastr, $mdDialog, $rootScope, step, $filter, competition) {
      console.log('EditStepDialogController:::');
      var vm = this;
      vm.editStep = editStep;
      vm.closeDialog = closeDialog;
      loadClubs();
      vm.step = new StepInstance(step);
      vm.clubs = [];
      vm.step.competition = competition;
      vm.invalidDate = false;




      $scope.$watchGroup(['vm.step.stepDate', 'vm.step.entryStartDate', 'vm.step.entryEndDate'], function(){
        if(vm.step.stepDate && vm.step.stepDate.length == 8 && moment(vm.step.stepDate, "DD-MM-YYYY").isValid() == false) {
          // console.log(moment(vm.step.stepDate, "DD-MM-YYYY").isValid()," ::: " , moment(vm.step.stepDate, "DD-MM-YYYY"));
          vm.invalidDate = true;
        } else {
          vm.invalidDate = false;
        }
        // if(vm.step.stepDate && vm.step.stepDate.length == 8
        //     && vm.step.entryStartDate && vm.step.entryStartDate.length == 8
        //     && vm.step.entryEndDate && vm.step.entryEndDate.length == 8) {
        //   console.log(moment(vm.step.stepDate, "DD-MM-YYYY").isValid()," ::: " , moment(vm.step.stepDate, "DD-MM-YYYY"));
        // }


      })

      function loadClubs() {
        LoadData.clubs.query().$promise.then(function(clubs) {
          vm.clubs = clubs;
          vm.step.club = $filter('filter')(vm.clubs, {_id: vm.step.club._id })[0];
        })
      }



      function editStep(step) {

        vm.step.$save().then(function(step) {
        toastr.success('Etapa cadastrada com sucesso!', step.name);
        $mdDialog.hide();
        }).catch(function(erro){
            console.log(erro);
            toastr.error("Problema ao adicionar a etapa");
        });
      }

      function closeDialog(){
        $mdDialog.cancel();
      }

    }
})();
