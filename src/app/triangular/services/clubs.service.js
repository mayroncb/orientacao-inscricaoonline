(function() {
    'use strict';
angular.module('app').factory('ClubInstance', function($resource){
    return $resource('http://localhost:3000/clubs/:id', { id: '@_id' },
    {
      query: { method: 'GET', isArray: true },
      update: { method: 'POST'}
    });
})

})();
