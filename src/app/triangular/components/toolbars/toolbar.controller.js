(function() {
    'use strict';

    angular
        .module('triangular.components')
        .controller('DefaultToolbarController', DefaultToolbarController);

    /* @ngInject */
    function DefaultToolbarController($cookies, $scope, $rootScope, UserInstance,
      $mdMedia, $translate, $state, $element, $filter, $mdUtil, $mdSidenav,
      $mdToast, $timeout, triBreadcrumbsService, triSettings, triLayout, $location) {

        var vm = this;
        vm.breadcrumbs = triBreadcrumbsService.breadcrumbs;
        vm.remove = remove;
        vm.emailNew = false;
        vm.languages = triSettings.languages;
        vm.openSideNav = openSideNav;
        vm.hideMenuButton = hideMenuButton;
        vm.switchLanguage = switchLanguage;
        vm.toggleNotificationsTab = toggleNotificationsTab;

        // initToolbar();
        if ($cookies.getAll()['u']){
            UserInstance.get({id: $cookies.getAll()['u']}, function(user) {
              vm.user = $rootScope.user;
              vm.avatar = vm.user.genre ? "assets/images/avatars/avatar-5.png":"assets/images/avatars/avatar-2.png"
            })
        } else {
            $location.url('/login')
        }



        $scope.$watch('$rootScope.user', function() {
            vm.user = $rootScope.user;
        });

        function remove(){
          console.log(":::: ", $cookies['connect.sid']);
          $cookies.remove('connect.sid');
        }

        function openSideNav(navID) {
            $mdUtil.debounce(function(){
                $mdSidenav(navID).toggle();
            }, 300)();
        }

        function switchLanguage(languageCode) {
            $translate.use(languageCode)
            .then(function() {
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('translate')('MESSAGES.LANGUAGE_CHANGED'))
                    .position('bottom right')
                    .hideDelay(500)
                );
            });
        }

        function hideMenuButton() {
            return triLayout.layout.sideMenuSize !== 'hidden' && $mdMedia('gt-md');
        }

        function toggleNotificationsTab(tab) {
            $rootScope.$broadcast('triSwitchNotificationTab', tab);
            vm.openSideNav('notifications');
        }


    }
})();
