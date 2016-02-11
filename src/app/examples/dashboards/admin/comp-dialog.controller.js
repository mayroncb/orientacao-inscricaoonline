(function() {
    'use strict';

    angular
        .module('app.fop.dashboards')
        .controller('CompDialogController', CompDialogController);

    /* @ngInject */
    function CompDialogController($mdDialog, LoadData, comp, $q, $http, API_CONFIG) {
        var vm = this;
        vm.comp = comp;
        vm.compImg;
        vm.closeDialog = closeDialog;

       function loadComp() {
          $http.get(API_CONFIG.url + "/entry/comp/", {params: { id : vm.comp.comp }})
            .success(function(image) {
              vm.compImg = image;
            })
            .error(function(error) {
              console.log(error);
            });
       };

       function closeDialog(){
         $mdDialog.cancel()
       }

       loadComp();

    }
})();
