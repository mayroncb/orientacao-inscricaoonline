angular.module('app').factory('Login', function($resource){
    return $resource('/login/process', {}, {
        login: {
            method: 'POST'
        }}
    );
})
