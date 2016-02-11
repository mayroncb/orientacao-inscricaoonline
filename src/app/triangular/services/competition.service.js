(function() {
    'use strict';
angular.module('app').factory('CompetitionInstance', function($resource, API_CONFIG){
    return $resource(API_CONFIG.url + '/competitions/:id', { id: '@_id' },
    {
      query: { method: 'GET', isArray: true },
      update: { method: 'POST'}
    });
})

})();
