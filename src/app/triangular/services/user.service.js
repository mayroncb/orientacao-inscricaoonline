(function() {
    'use strict';
angular.module('app').factory('UserInstance', function($resource){
    return $resource('http://localhost:3000/users/:id', { id: '@_id' },
    {
      // query: { method: 'GET', params: {}, isArray: false },
      update: { method: 'POST'}
    });
})

})();
