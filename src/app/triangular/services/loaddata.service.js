angular.module('app').
  factory("LoadData", function($resource) {
    return {
      clubs: $resource('http://localhost:3000/clubs', {}, {
        query: { method: 'GET', params: {}, isArray: true }
      }),
      categories: $resource('http://localhost:3000/categories', {}, {
        query: { method: 'GET', params: {}, isArray: true }
      }),
      states: $resource('http://localhost:3000/states', {}, {
        query: { method: 'GET', params: {}, isArray: true }
      })
    };
  })
