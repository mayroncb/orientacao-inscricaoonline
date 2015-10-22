angular.module('app').controller('UserController',
function($scope, $routeParams, User, dataService,
    DataToSignUp, toastr, $location, Login, $state) {
        console.log("UserController")
        $scope.buttonCreateUser = false;
        $scope.user = new User();
        $scope.formControll = true;
        $scope.login = function(name, pass) {

            var promise = Login.login({'name': name, 'pass': pass }).$promise;

            promise.then(function(data) {
                dataService.addData(data);
                $state.go('dashboard.index')
            }, function(erro){
                toastr.error("Login ou senha inválido")
                console.log("error")
            })
        }

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

            // $scope.salvar = function() {
            //     $scope.contato.$save()
            //     .then(function(){
            //         $scope.mensagem = {texto: "Salvo com sucesso!"};
            //         $scope.contato = new Contato();
            //     }).catch(function(){
            //         $scope.mensagem = {texto: "Erro ao salvar!"};
            //     });
            // }

            $scope.createUser = function() {
                $scope.user.type = "USER";
                $scope.user.$save()
                .then(function(user){
                    toastr.success('Usuário cadastrado com sucesso', user.name);
                    $scope.user = new User();
                    $scope.formControll = true;
                    $state.go('login.entrar');
                }).catch(function(erro){
                    console.log(erro);
                    toastr.error("Já existe um usuário com esse " + erro.data.fieldName  + " cadastrado!", 'Erro no cadastro');

                });
            }

        })

        .controller('EditUserController',
        function($scope, $routeParams, User, dataService, DataToSignUp,
            toastr, $location, $state) {

                console.log("EditUserController")
                $scope.user = new User();

                $scope.confirmPass = "";

                var data = dataService.getDatas()._id;
                User.get({_id:data}).$promise.then(function(user){
                    console.log(user);
                    $scope.user = new User(user);
                    $scope.user.password = "";
                })


                $scope.user.password = "";
                $scope.categories = DataToSignUp.categories.query(function(categories) {
                    //   $scope.user['category'] = $scope.categories[0]._id;
                });

                $scope.clubs = DataToSignUp.clubs.query(function(clubs){
                    //   $scope.user['club'] = $scope.clubs[0]._id;
                });

                $scope.states = DataToSignUp.states.query(function(states){
                    //   $scope.user['UF'] = $scope.states[14].UF;
                });

                $scope.updateUser = function() {
                    $scope.user.$update(function(user) {
                        $scope.user = new User(user);
                    })
                    .then(function(user){
                        toastr.success('Usuário alterado com sucesso');
                        $state.go('dashboard.index');
                    }).catch(function(erro){
                        console.log(erro);
                        toastr.error("Problema " + erro.data.fieldName  + " cadastrado!", 'Erro no cadastro');
                    });
                }



            });
