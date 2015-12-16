(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('StepFabController', StepFabController);

    /* @ngInject */
    function StepFabController($rootScope) {
        var vm = this;
        vm.addTodo = addTodo;

        ////////////////

        function addTodo($event) {
            $rootScope.$broadcast('addTodo', $event);
        }
    }
})();
