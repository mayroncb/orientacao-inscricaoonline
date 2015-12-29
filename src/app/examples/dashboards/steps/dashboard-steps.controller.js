(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('DashboardStepsController', DashboardStepsController);

    /* @ngInject */
    function DashboardStepsController($scope, $timeout, $mdToast, $rootScope, $state) {
        $timeout(function() {
            $rootScope.$broadcast('newMailNotification');
            $mdToast.show({
                template: '<md-toast><span flex>You have new email messages! View them <a href="" ng-click=vm.viewUnread()>here</a></span></md-toast>',
                controller: newMailNotificationController,
                controllerAs: 'vm',
                position: 'bottom right',
                hideDelay: 5000
            });
        }, 10000);

        //////////////

        function newMailNotificationController() {
            var vm = this;
            vm.viewUnread = function() {
                $state.go('admin-panel-email-no-scroll.email.inbox');
            };
        }
    }
})();
