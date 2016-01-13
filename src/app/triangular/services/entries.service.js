(function() {
    'use strict';
angular.module('app').factory('EntryInstance', function($resource){
    return $resource('http://localhost:3000/steps/entry/:id', { id: '@_id' },
    {
      query: { method: 'GET', isArray: true },
      update: { method: 'POST'}
    });
})

})();
