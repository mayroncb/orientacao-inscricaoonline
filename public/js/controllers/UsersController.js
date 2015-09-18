angular.module('app').controller('UsersController',
    function(User, $scope){

    $scope.contatos = [];

    $scope.filtro = '';

    $scope.mensagem = {texto: ''}

    function buscarContatos() {
        User.query(
            function(contatos) {
                $scope.contatos = contatos;
            },
            function(erro) {
                console.log("Não foi possível obter a lista");
                console.log(erro);
            }
        )
    }

    buscarContatos();


    $scope.removerContato = function(contato) {

     User.delete({id: contato._id},
            buscarContatos, function(erro){
                $scope.mensagem = {texto :"problema ao remover contato"}
            });
        }

    // $resource.get('/contatos')
    // .success(function(data){
    //     $scope.contatos = data;
    // }).error(function(statusText){
    //     console.log("Erro ao obter a lista");
    //     console.log(status.text);
    // })

})
