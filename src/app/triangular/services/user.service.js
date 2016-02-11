(function() {
    'use strict';
angular.module('app').factory('UserInstance', function($resource, API_CONFIG){
    return $resource(API_CONFIG.url + '/users/:id', { id: '@_id' },
    {
      // query: { method: 'GET',  isArray: true },
      update: { method: 'POST'}
    });
})

})();
