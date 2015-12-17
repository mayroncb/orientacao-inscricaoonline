(function() {
    'use strict';

angular.module('app').factory('interceptor', function($location, $q){

    var interceptor = {
        responseError: function(response) {
            if (response.status !== 200) {
                $location.path('/login');
            } if (response.status == 201) {

            }
            return $q.reject(response);
        }
    }
    return interceptor;
});
})();
