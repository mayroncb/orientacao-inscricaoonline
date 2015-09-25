
var moment = require('moment');
var errorHanler = require('../utils/errorHandler')
module.exports = function(app) {
    var controller = {}

    var User = app.models.User;


    controller.listarContatos = function(req, res) {
        res.json(contatos)
    }

    controller.obterContato = function(req, res) {
        var idContato = req.params.id;
        console.log(req.params.id);
        var contato = contatos.filter(function(contato) {
            return contato._id == idContato;
        })[0];
        contato ? res.json(contato) :
        res.status(404).send('Contato não econtrado');
    }

    controller.removerContato = function(req, res) {
        console.log("removed: ", req.params.id);
        var idContato = req.params.id;
        contatos = contatos.filter(function(contato) {
            return contato._id != idContato;
        });
        res.redirect(204);
    }

    controller.updateContato = function(req, res) {
         var userTmp = req.body;
         console.log(User);
         userTmp.dateBirth = moment(userTmp.dateBirth, "DD-MM-YYYY");
         userTmp.password = User.generateHash(userTmp.password);
         console.log(userTmp);
         if(userTmp._id) {
             User.findByIdAndUpdate(userTmp._id, userTmp).exec()
             .then(function(user) {
                 res.json(user);
             }, function(erro) {
                 console.log(erro);
                 res.status(500).json(erro);
             })
         } else {
             User.create(userTmp)
             .then(function(user) {
                 res.status(201).json(user);
             }, function(erro){
                 erro = errorHanler.getKeyErro(erro);
                 console.log(erro);
                 res.status(500).json(erro);
             })
         }
    }



    function atualiza(contatoAlterar){
        contatos = contatos.map(function(contato){
            if(contato._id == contatoAlterar._id) {
                contato = contatoAlterar;
            }
            return contato
        })
        return contatoAlterar;
    };

    var Category = app.models.Category;
    var Club = app.models.Club;

    // console.log(Club);

    // var categorias = require('../utils/categorias.json')
    // var clubes = require('../utils/clubes.json')



    // User.findOne({"name": "Paulo"}).exec()
    // .then(
    //     function(user){
    //         if(!user) {
    //             console.log("!Não encontrado...");
    //             var user = new User();
    //             user.name = "Paulo"
    //             user.surname = "Lira"
    //             user.phone = "839996383330"
    //             user.rg = "2783394"
    //             user.cpf = "06387717493"
    //             user.dateBirth = "20/07-1986"
    //             user.siCard = false
    //             user.email = "paulo.lira@gmail.com"
    //             user.type = "ADMIN"
    //             user.password = "ADMIN"
    //
    //             User.create(user);
    //
    //         } else {
    //             // console.log(user);
    //         }
    //     },
    //     function(erro){
    //         console.log(erro)
    //         res.status(404).json(erro);
    //     }
    // );
    // Category.collection.insert(categorias, function(data, err) {
    //     console.log(data);
    // });
    //
    // Club.collection.insert(clubes, function(data, err) {
    //     console.log(data);
    // })

    return controller;
}
