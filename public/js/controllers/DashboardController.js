angular.module('app').controller('DashboardController',
    function($scope, $routeParams, User, dataService, $location) {

        console.log("DashboardControllerrr")
        $scope.users = [{name: "Paulo", email: "paulo.liraa@gamil.com"}];
        var data = dataService.getDatas();
        if (data.length == 0){
            $location.path("/login");
        } else {
            $scope.user = data[0];
        }


        $scope.loadUsers  = function () {
            User.query().$promise.then(
                function(users) {
                    $scope.users = users;
                    console.log("123123");
                },
                function(erro) {
                    console.log("Não foi possível obter a lista");
                }
            )
        }

        $scope.loadUsers();

})
