(function() {
    'use strict';

    angular
        .module('app.fop.dashboards')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/examples/dashboards');

        $stateProvider
        .state('triangular.dashboards-layout', {
            abstract: true,
            views: {
                sidebarLeft: {
                    templateUrl: 'app/triangular/components/menu/menu.tmpl.html',
                    controller: 'MenuController',
                    controllerAs: 'vm'
                },
                content: {
                    template: '<div id="admin-panel-content-view" flex ui-view></div>'
                },
                belowContent: {
                    template: '<div ui-view="belowContent"></div>'
                }
            }
        })
        .state('triangular.admin-default.dashboard', {
            url: '/dashboard',
            controller: function($cookies, $state, $rootScope, UserInstance) {
              console.log("Swith dashboard")
              switch($rootScope.user.type) {
                  case "ADMIN":
                      $state.go('triangular.admin-default.dashboard-admin')
                      break;
                  case "USER":
                      $state.go('triangular.admin-default.dashboard-user')
                      break;
                  case "CLUB_ADMIN":
                      $state.go('triangular.admin-default.dashboard-club-admin')
                      break;
              }

              }
        })
        .state('triangular.admin-default.dashboard-admin', {
            url: '/dashboard/admin',
            data: {
                layout: {
                    showToolbar: true,
                    contentClass: 'full-image-background   background-overlay-static',
                    innerContentClass: 'overlay-gradient-20'
                }
            },
            views: {
                '': {
                    templateUrl: 'app/examples/dashboards/admin/dashboard-admin.tmpl.html',
                    controller: 'DashboardSalesController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('triangular.admin-default.dashboard-user', {
            url: '/dashboard/user',
            data: {
                layout: {
                    showToolbar: true,
                    contentClass: 'full-image-background   background-overlay-static',
                    innerContentClass: 'overlay-gradient-20'
                }
            },
            views: {
                '': {
                    templateUrl: 'app/examples/dashboards/user/dashboard-user.tmpl.html',
                    controller: 'DashboardUserController',
                    controllerAs: 'vm'
                },
            }
        })
        .state('triangular.admin-default.dashboard-club-admin', {
            url: '/dashboard/club',
            data: {
                layout: {
                    showToolbar: true,
                    contentClass: 'full-image-background   background-overlay-static',
                    innerContentClass: 'overlay-gradient-20'
                }
            },
            views: {
                '': {
                    templateUrl: 'app/examples/dashboards/club-admin/dashboard-club-admin.tmpl.html',
                    controller: 'DashboardClubAdminController',
                    controllerAs: 'vm'
                },
            }
        })


        triMenuProvider.addMenu({
            name: 'MENU.DASHBOARDS.DASHBOARDS',
            icon: 'zmdi zmdi-home',
            state: 'triangular.admin-default.dashboard',
            type: 'link',
            priority: 1.1,
        });

    }
})();
