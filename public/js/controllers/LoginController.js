angular.module('app').controller('LoginController',
    function($scope, $routeParams, User, Login) {
        console.log("LoginController");
        $scope.buttonCreateUser = false;
        $scope.user = new User();

        $scope.login = function(name, pass) {
            console.log("Name::: ", name);
            Login.login({'name': name, 'pass': pass })
            // $scope.contato.$save()
            // .then(function(){
            //     $scope.mensagem = {texto: "Salvo com sucesso!"};
            //     $scope.contato = new Contato();
            // }).catch(function(){
            //     $scope.mensagem = {texto: "Erro ao salvar!"};
            // });
        }


})
