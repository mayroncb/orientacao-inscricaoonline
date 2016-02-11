(function() {
    'use strict';

angular.module('app').factory('User', function($resource, API_CONFIG) {
    return $resource(API_CONFIG.url + '/users/:id', { id: '@_id' },
    {
    //   query: { method: 'GET', params: {}, isArray: true },
      update: { method: 'POST'}
    });
})
})();
