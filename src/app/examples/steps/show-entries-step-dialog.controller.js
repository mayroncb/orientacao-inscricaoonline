(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('ShowEntriesDialogController', ShowEntriesDialogController);

    /* @ngInject */
    function ShowEntriesDialogController($scope, step, $mdDialog, $rootScope,
      $mdToast, $filter, EntryInstance, API_CONFIG, $http) {
        var vm = this;
        vm.step = step;
        vm.query = {
           filter: '',
           limit: '5',
           order: '-user.name',
           page: 1
         };
        $http.get(API_CONFIG.url + "/entries/step/" + vm.step._id)
          .success(function(res) {
              vm.entries = res;
          }).error(function(error) {
            console.log(error);
          });

          vm.closeDialog = function(){
            $mdDialog.cancel();
          }
    }
})();
