angular.module('app').controller('DashboardController',
    function($scope, $routeParams, User, dataService, $location) {

        console.log("DashboardControllerrr")
        $scope.users = [];
        var data = dataService.getDatas();
        if (data.length == 0){
            $location.path("/login");
        } else {
            $scope.user = data[0];
        }


        function loadUsers() {
            User.query().$promise.then(
                function(users) {
                    $scope.users = users;
                },
                function(erro) {
                    console.log("Não foi possível obter a lista");
                }
            )
        }

        loadUsers();

})
