(function() {
    'use strict';
angular.module('app').factory('StepInstance', function($resource, API_CONFIG){
    return $resource(API_CONFIG.url + '/steps/:id', { id: '@_id' },
    {
      query: { method: 'GET', isArray: true },
      update: { method: 'POST'}
    });
})

})();
