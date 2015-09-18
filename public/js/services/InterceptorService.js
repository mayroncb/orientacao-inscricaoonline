angular.module('app').factory('interceptor', function($location, $q){

    var interceptor = {
        responseError: function(response) {
            if (response.status == 401) {
                $location.path('/login');
            }
            return $q.reject(response);
        }
    }
    return interceptor;
});
