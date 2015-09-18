angular.module('app').factory('User', function($resource){
    return $resource('/users/:id');
})
