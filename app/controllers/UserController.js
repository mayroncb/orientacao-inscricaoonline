
var moment = require('moment');
var errorHanler = require('../utils/errorHandler')
var passHandler = require('../utils/passHandler')

module.exports = function(app) {
    var controller = {}

    var User = app.models.User;

  controller.getCount = function(req, res) {
      User.count({}, function(err, n){
        res.status(200).json({value: n});
      })
    }

    controller.listUsers = function(req, res) {
        User.find({}).populate('club').exec(function(err, users){
            res.json(users)
        })

    }

    controller.obterContato = function(req, res) {
        User.findOne({_id: req.params.id}, function(err, data) {
            // console.log(data);
            res.json(data);
        })
    }

    controller.listUsersByClub = function(req, res) {
        User.find({club: req.params.id}, function(err, data) {
            // console.log(data);
            res.json(data);
        })
    }

    controller.getUserByName = function(req, res) {
      var text = req.params.text;
      var entries = text.toString().split(" ");
      if(entries.length == 1) {
        User.find({$or:[ {"firstname": { "$regex": text, "$options": "i" }},
                  { "surname": { "$regex": text, "$options": "i" }}]})
                  .populate("club").exec( function(err, docs) {
          setTimeout(function () {
            console.log(docs);
                res.status(200).json(docs);
          }, 100);
      });
    } else {
        User.find({$or:[ {"firstname": { "$regex": entries[0], "$options": "i" }},
                  { "surname": { "$regex": entries[1], "$options": "i" }}]})
                  .populate("club").exec( function(err, docs) {
          setTimeout(function () {
            console.log(docs);
                res.status(200).json(docs);
          }, 100);
      });
      }
    }

    controller.removerContato = function(req, res) {
        User.findOne({_id: req.params.id}, function(err, data) {
                data.remove(function(err, pro) {
                  res.status(204).end();
                })
              });
    }

    controller.updateContato = function(req, res) {
        var userTmp = req.body;
        if(userTmp.password){
            console.log("WITH PASSS PICA::: ", userTmp.password);
        }
        console.log("UPDATE::: ", userTmp);
        userTmp.dateBirth = moment(userTmp.dateBirth, "DD-MM-YYYY");
        if (userTmp.password) {
            console.log("with PASS")
            userTmp.password = passHandler.generateHash(userTmp.password);
        } else {
            console.log("without PASS")
            delete userTmp.password;
        }
        // console.log("POSTT::: ", userTmp);

        User.findByIdAndUpdate(userTmp._id, userTmp).exec()
        .then(function(user) {
          User.findOne({_id: user.id}, function(err, data) {
              res.json(data);
          })
        }, function(erro) {
            console.log("Erro ao atualizar!!!!");
            console.log(erro);
            res.status(500).json(erro);
        })

    }

    controller.addContato = function(req, res) {
        var userTmp = req.body;
        userTmp.dateBirth = moment(userTmp.dateBirth, "DD-MM-YYYY");
        userTmp.password = passHandler.generateHash(userTmp.password);
        // console.log( '???', userTmp);
        User.create(userTmp)
        .then(function(user) {
            res.status(201).json(user);
        }, function(erro){
            erro = errorHanler.getKeyErro(erro);
            console.log(erro);
            res.status(500).json(erro);
        })
    }


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
