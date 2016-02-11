(function() {
    'use strict';
angular.module('app').factory('ClubInstance', function($resource, API_CONFIG){
    return $resource(API_CONFIG.url + '/clubs/:id', { id: '@_id' },
    {
      query: { method: 'GET', isArray: true },
      update: { method: 'POST'}
    });
})

})();
