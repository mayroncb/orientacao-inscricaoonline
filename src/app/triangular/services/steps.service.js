(function() {
    'use strict';
angular.module('app').factory('StepInstance', function($resource){
    return $resource('http://localhost:3000/steps/:id', { id: '@_id' },
    {
      query: { method: 'GET', isArray: true },
      update: { method: 'POST'}
    });
})

})();
