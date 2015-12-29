(function() {
    'use strict';
angular.module('app').factory('CompetitionInstance', function($resource){
    return $resource('http://localhost:3000/competitions/:id', { id: '@_id' },
    {
      query: { method: 'GET', isArray: true },
      update: { method: 'POST'}
    });
})

})();
