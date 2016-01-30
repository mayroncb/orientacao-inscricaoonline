(function() {
    'use strict';

    angular
        .module('app.fop.dashboards')
        .controller('CompDialogController', CompDialogController);

    /* @ngInject */
    function CompDialogController($mdDialog, LoadData, comp, $q, $http) {
        var vm = this;
        vm.comp = comp;
        vm.compImg;
        vm.closeDialog = closeDialog;

       function loadComp() {
          $http.get("http://localhost:3000/entry/comp/", {params: { id : vm.comp.comp }})
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

      //  function printClick(){
      //   window.print()
      //  }

       loadComp();
        //
        // function next() {
        //     var index = day.images.indexOf(vm.currentImage);
        //     index = index + 1 < day.images.length ? index + 1 : 0;
        //     vm.currentImage = day.images[index];
        // }
        //
        // function prev() {
        //     var index = day.images.indexOf(vm.currentImage);
        //     index = index - 1 < 0 ? day.images.length -1 : index - 1;
        //     vm.currentImage = day.images[index];
        // }
    }
})();
