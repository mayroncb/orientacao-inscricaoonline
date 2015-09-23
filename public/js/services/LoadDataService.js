angular.module('app').
  factory("DataToSignUp", function($resource) {
    return {
      clubs: $resource('/clubs', {}, {
        query: { method: 'GET', params: {}, isArray: true }
      }),
      categories: $resource('/categories', {}, {
        query: { method: 'GET', params: {}, isArray: true }
      }),
      states: $resource('/states', {}, {
        query: { method: 'GET', params: {}, isArray: true }
      })
    };
  })
