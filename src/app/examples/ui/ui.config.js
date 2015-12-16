(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/examples/ui');

        $stateProvider
        .state('triangular.admin-default.steps', {
            url: '/steps',
            views: {
            '': {
              controller: 'StepsController',
              controllerAs: 'vm',
              templateUrl: 'app/examples/ui/steps.tmpl.html'

            }
            // ,
            // 'belowContent': {
            //     templateUrl: 'app/examples/ui/fab-button.tmpl.html',
            //     controller: 'StepFabController',
            //     controllerAs: 'vm'
            // }
          },
          data: {
              layout: {
                  contentClass: 'full-image-background mb-bg-fb-08 background-overlay-static',
                  innerContentClass: 'overlay-gradient-20'
              }
          }
        })
        $stateProvider
        .state('triangular.admin-default.adm', {
            url: '/steps',
            views: {
            '': {
              controller: 'StepsAdmController',
              controllerAs: 'vm',
              templateUrl: 'app/examples/ui/steps.tmpl.html'

            },
            'belowContent': {
                templateUrl: 'app/examples/ui/fab-button.tmpl.html',
                controller: 'StepFabController',
                controllerAs: 'vm'
            }
          },
          data: {
              layout: {
                  contentClass: 'full-image-background mb-bg-fb-08 background-overlay-static',
                  innerContentClass: 'overlay-gradient-20'
              }
          }
        })


        triMenuProvider.addMenu({
            name: 'MENU.UI.UI',
            icon: 'zmdi zmdi-run',
            state: 'triangular.admin-default.steps',
            type: 'link',
            priority: 2.1,

            // children: [{
            //     name: 'MENU.UI.COLORS',
            //     state: 'triangular.admin-default.ui-colors',
            //     type: 'link'
            // },{
            //     name: 'MENU.UI.FONT_AWESOME',
            //     state: 'triangular.admin-default.ui-fa-icons',
            //     type: 'link'
            // },{
            //     name: 'MENU.UI.MATERIAL_ICONS',
            //     state: 'triangular.admin-default.ui-material-icons',
            //     type: 'link'
            // },{
            //     name: 'MENU.UI.SKINS',
            //     state: 'triangular.admin-default.ui-skins',
            //     type: 'link'
            // },{
            //     name: 'MENU.UI.TYPOGRAPHY',
            //     state: 'triangular.admin-default.ui-typography',
            //     type: 'link'
            // },{
            //     name: 'MENU.UI.WEATHER_ICONS',
            //     state: 'triangular.admin-default.ui-weather-icons',
            //     type: 'link'
            // }]
        });
    }
})();
