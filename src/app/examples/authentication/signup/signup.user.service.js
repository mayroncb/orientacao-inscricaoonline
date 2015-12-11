(function() {
    'use strict';

angular.module('app').factory('User', function($resource) {
    return $resource('/users/:id', { id: '@_id' },
    {
    //   query: { method: 'GET', params: {}, isArray: true },
      update: { method: 'POST'}
    });
})
})();
