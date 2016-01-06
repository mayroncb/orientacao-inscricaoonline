
var moment = require('moment');

module.exports = function(app) {
    var controller = {}

    var Step = app.models.Step;
    var Competition = app.models.Competition;


    controller.listSteps = function(req, res) {
        Step.find({}).populate("club").exec(function(err, steps){
            res.json(steps)
        });

    }

    controller.getStep = function(req, res) {
        Step.findOne({_id: req.params.id}, function(err, data) {
            // console.log(data);
            res.json(data);
        })
    }

    controller.removeStep = function(req, res) {
        console.log("removed: ", req.params.id);
        Step.findOne({_id: req.params.id}, function(err, data) {
            data.delete(function(err) {
              if (err) {
                data.remove(function(err, pro) {
                })
              };
             Step.findOne({_id: req.params.id}, function(doc) {
               if (!doc) console.log('soft delete worked');
               res.status(200).end();
             })
            })
        })
    }

    controller.updateStep = function(req, res) {
      Step.findByIdAndUpdate(req.body._id, req.body).exec()
      .then(function(step) {
        Step.findOne({_id: step.id}, function(err, data) {
            res.json(data);
        })
      }, function(erro) {
          console.log("Erro ao atualizar!!!!");
          console.log(erro);
          res.status(500).json(erro);
      })


    }

    controller.addStep = function(req, res) {
        var step = req.body;

        step.stepDate = moment(step.stepDate, "DD-MM-YYYY");
        step.entryStartDate = moment(step.entryStartDate, "DD-MM-YYYY");
        step.entryEndDate = moment(step.entryEndDate, "DD-MM-YYYY");

        Step.create(req.body)
        .then(function(step) {
          console.log(step.competition);
          Competition.findById(step.competition, function(err, comp){
            console.log("Comp", comp);
            comp.steps.push(step);
            comp.save();
          })

            res.status(201).json(step);
        }, function(erro){
            console.log(erro);
            res.status(500).json(erro);
        })
    }

    setInterval(function () {
      var dateObj = new Date();
      var month = dateObj.getUTCMonth(); //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      Step.findOne(
        {entryStartDate: {$lte: new Date(year, month, day).toISOString()},
        entryEndDate: {$gt: new Date(year, month, day).toISOString()},
        isActive: false
        }, function(err, step) { 
          if (step) {
            step.isActive = true;
            step.save();
          }
      });
    }, 5000);

    return controller;
}
