(function() {
    'use strict';

    angular.module('app.examples.authentication').factory('LoginService', function($resource, API_CONFIG){
        return $resource(API_CONFIG.url + '/login/process', {}, {
            login: {
                method: 'POST'
            }}
        );
    })
})();
