angular.module('app').factory('interceptor', function($location, $q){

    var interceptor = {
        responseError: function(response) {
            console.log(response);
            if (response.status == 401) {
                $location.path('/login');
            } if (response.status == 201) {

            }
            return $q.reject(response);
        }
    }
    return interceptor;
});
