(function() {
    'use strict';

    angular
        .module('triangular')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($stateProvider, $compileProvider, triMenuProvider) {
        $stateProvider
        .state('triangular', {
            abstract: true,
            templateUrl: 'app/triangular/layouts/default/default.tmpl.html',
            resolve: {
              check: function($cookies, $state, $rootScope, UserInstance,
                $http, API_CONFIG, $filter, $location, $interval) {
                  if (API_CONFIG.url == ""){
                    var time = $interval(function() {
                      if (!$cookies.getAll()['connect.sid']) {
                          $location.url('/login');
                          $interval.cancel(time);
                      }
                    }, 1000);
                  }
                if (API_CONFIG.url !== "" && !$cookies.getAll()['connect.sid']) {
                    $location.url('/login')
                } else if ($cookies.getAll()['u']) {
                UserInstance.get({id: $cookies.getAll()['u']}, function(user) {
                  $rootScope.user = user;
                  if ($rootScope.user
                      && $rootScope.user.type === "ADMIN"
                      && !$filter('filter')(triMenuProvider.$get().menu, {name: "MENU.DASHBOARDS.ANALYTICS"}).length > 0) {
                      triMenuProvider.addMenu({
                          name: 'MENU.DASHBOARDS.ANALYTICS',
                          icon: 'zmdi zmdi-assignment-o',
                          state: 'triangular.maintenance.dashboard-analytics',
                          type: 'dropdown',
                          priority: 3.1,
                          children: [{
                              name: 'MENU.DASHBOARDS.USERS',
                              state: 'triangular.maintenance.maintenance-users',
                              type: 'link'
                          },{
                              name: 'MENU.DASHBOARDS.COMPETITIONS',
                              state: 'triangular.maintenance.maintenance-competitions',
                              type: 'link'
                          },{
                              name: 'MENU.DASHBOARDS.STEPS',
                              state: 'triangular.maintenance.maintenance-steps',
                              type: 'link'
                          },{
                              name: 'MENU.DASHBOARDS.CLUBS',
                              state: 'triangular.maintenance.maintenance-clubs',
                              type: 'link'
                          }
                        ]
                      })
                    }
                });
              } else {
                $location.url('/login')
              }
                $rootScope.$on('$stateChangeSuccess',
                  function(event, toState, toParams, fromState, fromParams) {
                    if (toState.name === 'triangular.admin-default.dashboard-admin'
                        && $rootScope.user
                        && $rootScope.user.type !== "ADMIN") {
                            $state.go('triangular.admin-default.dashboard')
                    } else if (toState.name === 'triangular.admin-default.dashboard-club-admin'
                            && $rootScope.user
                            && $rootScope.user.type !== "CLUB_ADMIN") {
                              $state.go('triangular.admin-default.dashboard')
                    }
                })
              }
            },
            controller: 'DefaultLayoutController',
            controllerAs: 'layoutController'

        })
        .state('triangular-no-scroll', {
            abstract: true,
            templateUrl: 'app/triangular/layouts/default/default-no-scroll.tmpl.html',
            controller: 'DefaultLayoutController',
            controllerAs: 'layoutController'
        })
        .state('triangular.admin-default', {
            abstract: true,
            views: {
                sidebarLeft: {
                    templateUrl: 'app/triangular/components/menu/menu.tmpl.html',
                    controller: 'MenuController',
                    controllerAs: 'vm'
                },
                sidebarRight: {
                    templateUrl: 'app/triangular/components/notifications-panel/notifications-panel.tmpl.html',
                    controller: 'NotificationsPanelController',
                    controllerAs: 'vm'
                },
                toolbar: {
                    templateUrl: 'app/triangular/components/toolbars/toolbar.tmpl.html',
                    controller: 'DefaultToolbarController',
                    controllerAs: 'vm'
                },
                content: {
                    template: '<div id="admin-panel-content-view" class="{{layout.innerContentClass}}" flex ui-view></div>'
                },
                belowContent: {
                    template: '<div ui-view="belowContent"></div>'
                }
            }
        })
        .state('triangular.maintenance', {
            abstract: true,
            views: {
                sidebarLeft: {
                    templateUrl: 'app/triangular/components/menu/menu.tmpl.html',
                    controller: 'MenuController',
                    controllerAs: 'vm'
                },
                sidebarRight: {
                    templateUrl: 'app/triangular/components/notifications-panel/notifications-panel.tmpl.html',
                    controller: 'NotificationsPanelController',
                    controllerAs: 'vm'
                },
                toolbar: {
                    templateUrl: 'app/triangular/components/toolbars/toolbar.tmpl.html',
                    controller: 'DefaultToolbarController',
                    controllerAs: 'vm'
                },
                content: {
                    template: '<div id="admin-panel-content-view" class="{{layout.innerContentClass}}" flex ui-view></div>'
                },
                belowContent: {
                    template: '<div ui-view="belowContent"></div>'
                }
            }
        })
        .state('triangular.admin-default-no-scroll', {
            abstract: true,
            views: {
                sidebarLeft: {
                    templateUrl: 'app/triangular/components/menu/menu.tmpl.html',
                    controller: 'MenuController',
                    controllerAs: 'vm'
                },
                sidebarRight: {
                    templateUrl: 'app/triangular/components/notifications-panel/notifications-panel.tmpl.html',
                    controller: 'NotificationsPanelController',
                    controllerAs: 'vm'
                },
                toolbar: {
                    templateUrl: 'app/triangular/components/toolbars/toolbar.tmpl.html',
                    controller: 'DefaultToolbarController',
                    controllerAs: 'vm'
                },
                content: {
                    template: '<div flex ui-view layout="column" class="overflow-hidden"></div>'
                }
            }
        });
    }
})();
