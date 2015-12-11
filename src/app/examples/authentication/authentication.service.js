(function() {
    'use strict';

    angular.module('app.examples.authentication').factory('LoginService', function($resource){
        return $resource('http://localhost:3000/login/process', {}, {
            login: {
                method: 'POST'
            }}
        );
    })
})();
