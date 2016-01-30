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

        // .state('triangular.admin-default.dashboard-competitions', {
        //     url: '/dashboards/competitions',
        //     views: {
        //       '': {
        //             templateUrl: 'app/examples/dashboards/competitions/dashboard-competitions.tmpl.html',
        //             controller: 'DashboardCompetitionsController',
        //             controllerAs: 'vm'
        //           },
        //           'belowContent': {
        //               templateUrl: 'app/examples/dashboards/competitions/fab-button.tmpl.html',
        //               controller: 'CompetitionsFabController',
        //               controllerAs: 'vm'
        //           }
        //     }
        //
        // })
        // .state('triangular.admin-default.dashboard-users', {
        //     url: '/dashboards/users',
        //     views:{
        //       '':{
        //         templateUrl: 'app/examples/dashboards/users/dashboard-users.tmpl.html',
        //         controller: 'DashboardUsersController',
        //         controllerAs: 'vm'
        //       },
        //       belowContent: {
        //         templateUrl: 'app/examples/dashboards/users/fab-button-add-user.tmpl.html',
        //         controller: 'AddUserFabController',
        //         controllerAs: 'vm'
        //       }
        //     }
        //
        // })
        // .state('triangular.admin-default.dashboard-steps', {
        //     url: '/dashboards/steps',
        //     templateUrl: 'app/examples/dashboards/steps/dashboard-steps.tmpl.html',
        //     controller: 'DashboardStepsController',
        //     controllerAs: 'vm'
        // })
        // .state('triangular.admin-default.dashboard-clubs', {
        //     url: '/dashboards/clubs',
        //     views: {
        //     '':{
        //
        //     templateUrl: 'app/examples/dashboards/clubs/dashboard-clubs.tmpl.html',
        //     controller: 'DashboardClubsController',
        //     controllerAs: 'vm'
        //   },
        //   'belowContent': {
        //       templateUrl: 'app/examples/dashboards/clubs/fab-button.tmpl.html',
        //       controller: 'ClubsFabController',
        //       controllerAs: 'vm'
        //   }
        //   }
        // })
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
                },
                // 'belowContent': {
                //     templateUrl: 'app/examples/dashboards/sales/fab-button.tmpl.html',
                //     controller: 'SalesFabController',
                //     controllerAs: 'vm'
                // }
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
                // 'belowContent': {
                //     templateUrl: 'app/examples/dashboards/sales/fab-button.tmpl.html',
                //     controller: 'SalesFabController',
                //     controllerAs: 'vm'
                // }
            }
        })
        // .state('triangular.admin-default.dashboard-draggable', {
        //     url: '/dashboards/draggable-widgets',
        //     templateUrl: 'app/examples/dashboards/dashboard-draggable.tmpl.html',
        //     controller: 'DashboardDraggableController',
        //     controllerAs: 'vm'
        // });

        triMenuProvider.addMenu({
            name: 'MENU.DASHBOARDS.DASHBOARDS',
            icon: 'zmdi zmdi-home',
            state: 'triangular.admin-default.dashboard-user',
            type: 'link',
            priority: 1.1,
        });
        // triMenuProvider.addMenu({
        //     name: 'MENU.DASHBOARDS.ANALYTICS',
        //     icon: 'zmdi zmdi-assignment-o',
        //     state: 'triangular.admin-default.dashboard-adm',
        //     type: 'dropdown',
        //     priority: 3.1
          //   children: [{
          //       name: 'MENU.DASHBOARDS.USERS',
          //       state: 'triangular.admin-default.dashboard-users',
          //       type: 'link'
          //   },{
          //       name: 'MENU.DASHBOARDS.COMPETITIONS',
          //       state: 'triangular.admin-default.dashboard-competitions',
          //       type: 'link'
          //   },{
          //       name: 'MENU.DASHBOARDS.STEPS',
          //       state: 'triangular.admin-default.dashboard-steps',
          //       type: 'link'
          //   },{
          //       name: 'MENU.DASHBOARDS.CLUBS',
          //       state: 'triangular.admin-default.dashboard-clubs',
          //       type: 'link'
          //   }
          // ]
        // });

    }
})();
