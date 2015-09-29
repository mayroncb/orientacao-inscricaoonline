angular.module('app').factory('interceptor', function($location, $q, toastr){

    var interceptor = {
        responseError: function(response) {
            if (response.status == 401) {
             
                $location.path('/login');
            } if (response.status == 201) {

            }
            return $q.reject(response);
        }
    }
    return interceptor;
});
