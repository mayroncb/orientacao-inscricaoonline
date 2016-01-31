(function() {
    'use strict';

    angular
        .module('app.fop.maintenance')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/examples/maintenance');


        $stateProvider
        .state('triangular.maintenance-layout', {
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

        .state('triangular.maintenance.maintenance-competitions', {
            url: '/maintenance/competitions',
            views: {
              '': {
                    templateUrl: 'app/examples/maintenance/competitions/maintenance-competitions.tmpl.html',
                    controller: 'MaintenanceCompetitionsController',
                    controllerAs: 'vm'
                  },
                  'belowContent': {
                      templateUrl: 'app/examples/maintenance/competitions/fab-button.tmpl.html',
                      controller: 'CompetitionsFabController',
                      controllerAs: 'vm'
                  }
            }

        })
        .state('triangular.maintenance.maintenance-users', {
            url: '/maintenance/users',
            views:{
              '':{
                templateUrl: 'app/examples/maintenance/users/maintenance-users.tmpl.html',
                controller: 'MaintenanceUsersController',
                controllerAs: 'vm'
              },
              belowContent: {
                templateUrl: 'app/examples/maintenance/users/fab-button-add-user.tmpl.html',
                controller: 'AddUserFabController',
                controllerAs: 'vm'
              }
            }

        })
        .state('triangular.maintenance.maintenance-steps', {
            url: '/maintenance/steps',
            templateUrl: 'app/examples/maintenance/steps/maintenance-steps.tmpl.html',
            controller: 'MaintenanceStepsController',
            controllerAs: 'vm'
        })
        .state('triangular.maintenance.maintenance-clubs', {
            url: '/maintenance/clubs',
            views: {
            '':{

            templateUrl: 'app/examples/maintenance/clubs/maintenance-clubs.tmpl.html',
            controller: 'MaintenanceClubsController',
            controllerAs: 'vm'
          },
          'belowContent': {
              templateUrl: 'app/examples/maintenance/clubs/fab-button.tmpl.html',
              controller: 'ClubsFabController',
              controllerAs: 'vm'
          }
          }
        })
        // .state('triangular.admin-default.dashboard-server', {
        //     url: '/dashboards/server',
        //     templateUrl: 'app/examples/dashboards/server/dashboard-server.tmpl.html',
        //     controller: 'DashboardServerController',
        //     controllerAs: 'vm'
        // })
        // .state('triangular.admin-default.dashboard-widgets', {
        //     url: '/dashboards/widgets',
        //     templateUrl: 'app/examples/dashboards/widgets.tmpl.html'
        // })
        // .state('triangular.admin-default.dashboard-social', {
        //     url: '/dashboards/social',
        //     templateUrl: 'app/examples/dashboards/social/dashboard-social.tmpl.html',
        //     controller: 'DashboardSocialController',
        //     controllerAs: 'vm'
        // })
        // .state('triangular.admin-default.dashboard-sales', {
        //     url: '/dashboard/admin',
        //     data: {
        //         layout: {
        //             showToolbar: true,
        //             contentClass: 'full-image-background   background-overlay-static',
        //             innerContentClass: 'overlay-gradient-20'
        //         }
        //     },
        //     views: {
        //         '': {
        //             templateUrl: 'app/examples/dashboards/sales/dashboard-sales.tmpl.html',
        //             controller: 'DashboardSalesController',
        //             controllerAs: 'vm'
        //         },
        //         // 'belowContent': {
        //         //     templateUrl: 'app/examples/dashboards/sales/fab-button.tmpl.html',
        //         //     controller: 'SalesFabController',
        //         //     controllerAs: 'vm'
        //         // }
        //     }
        // })
        // .state('triangular.admin-default.dashboard-draggable', {
        //     url: '/dashboards/draggable-widgets',
        //     templateUrl: 'app/examples/dashboards/dashboard-draggable.tmpl.html',
        //     controller: 'DashboardDraggableController',
        //     controllerAs: 'vm'
        // });

        // triMenuProvider.addMenu({
        //     name: 'MENU.DASHBOARDS.ANALYTICS',
        //     icon: 'zmdi zmdi-assignment-o',
        //     state: 'triangular.maintenance.dashboard-analytics',
        //     type: 'dropdown',
        //     priority: 3.1,
        //     children: [{
        //         name: 'MENU.DASHBOARDS.USERS',
        //         state: 'triangular.maintenance.maintenance-users',
        //         type: 'link'
        //     },{
        //         name: 'MENU.DASHBOARDS.COMPETITIONS',
        //         state: 'triangular.maintenance.maintenance-competitions',
        //         type: 'link'
        //     },{
        //         name: 'MENU.DASHBOARDS.STEPS',
        //         state: 'triangular.maintenance.maintenance-steps',
        //         type: 'link'
        //     },{
        //         name: 'MENU.DASHBOARDS.CLUBS',
        //         state: 'triangular.maintenance.maintenance-clubs',
        //         type: 'link'
        //     }
        //   ]
        // });

    }
})();
