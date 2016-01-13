
var moment = require('moment');
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var Busboy = require('busboy');
var fs = require('fs');
module.exports = function(app) {

    var controller = {}
    var Step = app.models.Step;
    var Competition = app.models.Competition;
    var gfs;
    mongoose.connection.on('connected', function(){
      Grid.mongo = mongoose.mongo;
      var db = mongoose.connection.db;
      gfs = new Grid(db);
    });


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
              Competition.update(
                {_id: data.competition},
                {$pull: {steps: req.params.id}}, function(err, ok){
                  console.log(err, ok);

                }
              )
             Step.findOne({_id: req.params.id}, function(doc) {
               if (!doc) console.log('soft delete worked');
               res.status(200).end();
             })
            })
        })
    }

    controller.addEntry = function(req, res) {
      var file = req.files.file;
      var order = JSON.parse(req.body.order);

      var writestream = gfs.createWriteStream({
        filename: file.name
      });
      fs.createReadStream(file.path).pipe(writestream);

      writestream.on('close', function (file) {
        order.comp = file.id;
         Step.findById(req.params.id,function(err, step) {
            step.entries.push(order);
            step.save(function(err, step2){
              res.status(200).send(step2);
            });
        })

        console.log(file.filename + ' Written To DB');
      });
    }

    controller.updateStep = function(req, res) {
      var step = req.body;
      step.stepDate = moment(step.stepDate, "DD-MM-YYYY");
      step.entryStartDate = moment(step.entryStartDate, "DD-MM-YYYY");
      step.entryEndDate = moment(step.entryEndDate, "DD-MM-YYYY");
      Step.findByIdAndUpdate(req.body._id, req.body).exec()
      .then(function(step) {
        checkOpenSteps();
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
          checkOpenSteps();
          Competition.findById(step.competition, function(err, comp){
            comp.steps.push(step);
            comp.save();
          })

            res.status(201).json(step);
        }, function(erro){
            console.log(erro);
            res.status(500).json(erro);
        })
    }

    checkOpenSteps();
    setInterval(checkOpenSteps, 5000);

function checkOpenSteps() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth(); //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    Step.findOne({$and: [
      {entryStartDate: {$lte: new Date(year, month, day).toISOString()}},
      {entryEndDate: {$gt: new Date(year, month, day).toISOString()}},
      {isActive: false}
    ]}, function(err, step) { 
      // console.log( "AND", err, step)
        if (step) {
          step.isActive = true;
          step.save();
        }
    });
    Step.findOne({
      $and: [
          {$or: [
          {
            entryStartDate: {$gt: new Date(year, month, day).toISOString()}
          },
          {
            entryEndDate: {$lt: new Date(year, month, day).toISOString()}
          },
        ]},
        {isActive: true}
      ]
      }, function(err, step) { 
        if (step) {
          // console.log("chamou:: ", step);
          step.isActive = false;
          step.save();
        }
    });
  }


    return controller;
}
