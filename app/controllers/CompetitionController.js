
var moment = require('moment');
var async = require('async');

module.exports = function(app) {
    var controller = {}

    var Competition = app.models.Competition;
    var User = app.models.User;


    controller.listCompetitions = function(req, res) {




        Competition.find({})
        .populate({path: "steps", populate: {path: "club"}})
        .lean()
        .exec(function(err, competitions) {
          uIds = [];
          loadedUsers = [];
          async.series([
            function(callback) {
              async.forEach(competitions, function(comp) {
                compIndex = competitions.indexOf(comp);
                async.forEach(comp.steps, function(step){
                  stepIndex = comp.steps.indexOf(step)
                  async.forEach(step.entries, function(entry) {
                    entryIndex = step.entries.indexOf(entry);
                    uIds.push(entry.user)

                  })
                })
              })
              User.find()
                .where('_id')
                .in(uIds)
                .exec(function(err, users){
                  loadedUsers = users;
                  callback()
                })
            },
            function(callback){
              async.forEach(competitions, function(comp) {
                compIndex = competitions.indexOf(comp);
                async.forEach(comp.steps, function(step){
                  stepIndex = comp.steps.indexOf(step)
                  async.forEach(step.entries, function(entry) {
                    entryIndex = step.entries.indexOf(entry);
                    async.forEach(loadedUsers, function(user){
                      if(JSON.stringify(competitions[compIndex].steps[stepIndex].entries[entryIndex].user)
                          === JSON.stringify(user._id)) {
                          competitions[compIndex].steps[stepIndex].entries[entryIndex].user = user
                      }
                    })
                  })
                })
              })
              res.json(competitions);
            }
          ])



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
