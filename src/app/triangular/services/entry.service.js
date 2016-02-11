(function() {
    'use strict';
angular.module('app').factory('EntryInstance', function($resource, API_CONFIG){
    return $resource(API_CONFIG.url + '/entries/:id', { id: '@_id' },
    {
      query: { method: 'GET', isArray: true },
      update: { method: 'POST'}
    });
})

})();
