angular.module('app').controller('UserController',
    function($scope, $routeParams, User, DataToSignUp) {

        $scope.categories = DataToSignUp.categories.query(function(categories) {
            $scope.user['category'] = $scope.categories[0]._id;
        });

        $scope.clubs = DataToSignUp.clubs.query(function(clubs){
            console.log($scope.clubs[0]._id);
            $scope.user['club'] = $scope.clubs[0]._id;
        });

        $scope.states = DataToSignUp.states.query(function(states){
            $scope.user['UF'] = $scope.states[14].UF;
        });

        $scope.clubSelected = {};
        $scope.categorySelected = {};

        if($routeParams.id) {
            User.get({id: $routeParams.id},
            function(user){
                $scope.user = user;
            },
            function(erro){
                console.log('error');
            })
        } else {
            $scope.user = new User();

        }

        $scope.salvar = function() {
            $scope.contato.$save()
            .then(function(){
                $scope.mensagem = {texto: "Salvo com sucesso!"};
                $scope.contato = new Contato();
            }).catch(function(){
                $scope.mensagem = {texto: "Erro ao salvar!"};
            });
        }

        $scope.createUser = function() {
            $scope.user.type = "USER";
            $scope.user.$save()
            .then(function(){
                $scope.mensagem = {texto: "Salvo com sucesso!"};
                $scope.user = new User();
            }).catch(function(){
                $scope.mensagem = {texto: "Erro ao salvar!"};
            });

        }
})
