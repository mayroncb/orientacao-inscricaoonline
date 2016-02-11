(function() {
    'use strict';

angular.module('app').
  factory("LoadData", function($resource, API_CONFIG) {
    return {
      clubs: $resource(API_CONFIG.url + '/clubs', {}, {
        query: { method: 'GET', params: {}, isArray: true }
      }),
      categories: $resource(API_CONFIG.url + '/categories', {}, {
        query: { method: 'GET', params: {}, isArray: true }
      }),
      states: $resource(API_CONFIG.url + '/states', {}, {
        query: { method: 'GET', params: {}, isArray: true }
      }),
      userByName: $resource(API_CONFIG.url + '/users/q/:text', {}, {
        query: { method: 'GET', params: {text: '@text'}, isArray: true }
      }),
      userQtd: $resource(API_CONFIG.url + '/users/qtd', {}, {
        query: { method: 'GET', isArray: false }
      }),
      clubQtd: $resource(API_CONFIG.url + '/clubs/qtd', {}, {
        query: { method: 'GET',  isArray: false }
      }),
      loadComp: $resource(API_CONFIG.url + '/entry/comp/:id', {}, {
        query: { method: 'GET',  params:{id: '@id'}, isArray: false }
      })
    };
  })
})();
