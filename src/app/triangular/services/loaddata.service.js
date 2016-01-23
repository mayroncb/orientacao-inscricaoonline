(function() {
    'use strict';

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
      }),
      userByName: $resource('http://localhost:3000/users/q/:text', {}, {
        query: { method: 'GET', params: {text: '@text'}, isArray: true }
      }),
      userQtd: $resource('http://localhost:3000/users/qtd', {}, {
        query: { method: 'GET', isArray: false }
      }),
      clubQtd: $resource('http://localhost:3000/clubs/qtd', {}, {
        query: { method: 'GET',  isArray: false }
      })
    };
  })
})();
