angular.module('app').controller('DashboardController',
    function($scope, $routeParams, User, dataService, $location) {

        console.log("DashboardController")

        $scope.buttonCreateUser = false;
        var data = dataService.getDatas();
        if (data.length == 0){
            $location.path("/login");
        } else {
            $scope.user = data[0];
        }

})
