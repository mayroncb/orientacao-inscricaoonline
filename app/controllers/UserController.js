var moment = require('moment');
var errorHanler = require('../utils/errorHandler');
var passHandler = require('../utils/passHandler');
var Email = require('../utils/mailUtils.js');
var shortid = require('shortid');

module.exports = function(app) {
    var controller = {}
    var User = app.models.User;
    var mail = new Email()


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

    controller.getUser = function(req, res) {
        User.findOne({_id: req.params.id}).populate('club').exec(function(err, data) {
            res.json(data);
        })
    }

    controller.listUsersByClub = function(req, res) {
         User.find({club: req.params.id}).populate('club').exec(function(err, data) {
            res.json(data);
        })
    }

    controller.getUserByName = function(req, res) {
      var text = req.params.text;
        User.find({"name": { "$regex": text, "$options": "i" }})
                  .populate("club").exec( function(err, docs) {
          setTimeout(function () {
                res.status(200).json(docs);
          }, 100);
      });

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

    controller.reset = function(req, res) {
        var email = req.params.email;
        console.log(email, " :::: ")
        User.findOne({email: email}).exec().then(function(user) {
          console.log(user)
          if(!user){
            console.log("ERR")
            res.status(404).send("Email não encontrado!");
          } else {
            mail.sendMail("Alteração de senha", user, "reset");
            res.json(user);
          }

        })
    }

    controller.resetPass = function(req, res) {
        var id = req.params.id;
        var newPass = shortid.generate();
        User.findOne({_id: id}, function(err, user) {
          user.password = passHandler.generateHash(newPass);
          user.save();
          mail.sendMail("Alteração de senha", user, "resetpass", newPass);
          res.redirect('/');
        })
    }

    controller.addContato = function(req, res) {
        var userTmp = req.body;
        userTmp.dateBirth = moment(userTmp.dateBirth, "DD-MM-YYYY");
        userTmp.password = passHandler.generateHash(userTmp.password);
        // console.log( '???', userTmp);
        User.create(userTmp)
        .then(function(user) {
            mail.sendMail("Bem vindo a FOP", user, "cadastro");
            res.status(201).json(user);
        }, function(erro){
            erro = errorHanler.getKeyErro(erro);
            console.log(erro);
            res.status(500).json(erro);
        })
    }


    // var Category = app.models.Category;
    // var Club = app.models.Club;

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
