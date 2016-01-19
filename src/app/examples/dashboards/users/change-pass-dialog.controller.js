(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('ChangePassDialogController',
        ChangePassDialogController);

    /* @ngInject */
    function ChangePassDialogController($scope, LoadData, moment,
      UserInstance,  toastr, $mdDialog, $rootScope, user, $filter) {
      console.log('ChangePassDialogController:::');
      var vm = this;
      vm.changePass = changePass;
      vm.closeDialog = closeDialog;
      vm.user = user;
      vm.user.password = ''

      function changePass(user) {
        user.$save().then(function(user) {
        toastr.success('Senha alterada com sucesso!');
        $mdDialog.hide();
        }).catch(function(erro){
            delete user.password
            delete user.confirm
            console.log(erro);
            toastr.error("Problema ao alterar a senha");
        });
      }

      function closeDialog(){
        $mdDialog.cancel();
      }

    }
})();
