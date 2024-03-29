(function() {
    'use strict';

    angular
        .module('app', [
            'triangular',
            'ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages',
            'ngMaterial', 'ngResource', 'ui.router', 'pascalprecht.translate',
            'LocalStorageModule', 'googlechart', 'chart.js', 'linkify',
            'ui.calendar', 'angularMoment', 'textAngular', 'uiGmapgoogle-maps',
            'hljs', 'md.data.table', angularDragula(angular), 'ngFileUpload',
            'ui.mask', 'ngMask',  'toastr', 'ngCsv', 'ngFileSaver',
            // 'seed-module'
            // uncomment above to activate the example seed module
            'app.examples'
        ])
        // create a constant for languages so they can be added to both triangular & translate
        .constant('APP_LANGUAGES', [{
        //     name: 'LANGUAGES.CHINESE',
        //     key: 'zh'
        // },{
        //     name: 'LANGUAGES.ENGLISH',
        //     key: 'en'
        // },{
        //     name: 'LANGUAGES.FRENCH',
        //     key: 'fr'
        // },{
            name: 'LANGUAGES.PORTUGUESE',
            key: 'pt'
        }])
        // set a constant for the API we are connecting to
        .constant('API_CONFIG', {
            'url': ''
            // 'url': 'http://localhost:3000'
        });
})();
