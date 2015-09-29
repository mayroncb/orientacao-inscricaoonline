angular.module('app').controller('LoginController',
    function($scope, $routeParams, User, Login, dataService, $location) {
        console.log("LoginController");
        $scope.buttonCreateUser = false;
        $scope.user = new User();

        $scope.login = function(name, pass) {

            var promise = Login.login({'name': name, 'pass': pass }).$promise;

            promise.then(function(data){
                dataService.addData(data);
                $location.path("/dashboard");
            })

        }
})
