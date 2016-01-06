
var moment = require('moment');

module.exports = function(app) {
    var controller = {}

    var Competition = app.models.Competition;


    controller.listCompetitions = function(req, res) {
        Competition.find({})
        .populate({path: "steps", populate: {path: "club"}})
        .exec(function(err, competitions){
            res.json(competitions);
        });

    }

    controller.getCompetition = function(req, res) {
        Competition.findOne({_id: req.params.id}, function(err, data) {
            // console.log(data);
            res.json(data);
        })
    }

    controller.removeCompetition = function(req, res) {
        console.log("removed: ", req.params.id);
        Competition.findOne({_id: req.params.id}, function(err, data) {
            data.delete(function(err) {
              if (err) {
                data.remove(function(err, pro) {
                })
              };
             Competition.findOne({_id: req.params.id}, function(doc) {
               if (!doc) console.log('soft delete worked');
               res.status(200).end();
             })
            })
        })
    }

    controller.updateCompetition = function(req, res) {
      Competition.findByIdAndUpdate(req.body._id, req.body).exec()
      .then(function(competition) {
        Competition.findOne({_id: competition.id}, function(err, data) {
            res.json(data);
        })
      }, function(erro) {
          console.log("Erro ao atualizar!!!!");
          console.log(erro);
          res.status(500).json(erro);
      })


    }

    controller.addCompetition = function(req, res) {

        Competition.create(req.body)
        .then(function(competition) {
            res.status(201).json(competition);
        }, function(erro){
            console.log(erro);
            res.status(500).json(erro);
        })
    }

    return controller;
}
