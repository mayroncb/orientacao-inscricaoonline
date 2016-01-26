
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
        Step.find({}).populate("club entries").exec(function(err, steps){
            res.json(steps)
        });

    }
    controller.loadComp = function(req, res) {
        console.log(req.params.id)
        gfs.findOne({ _id: req.params.id}, function(err, file) {
          console.log(file)
            if(err) {
                res.status(404).end();
            } else if(!file){
                res.status(404).end();
            } else {
                var readstream = gfs.createReadStream({
                  _id: file._id
                });
                var bufs = [];
                res.set('Content-Type', 'image/png');
                // res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');

                readstream.on('error', function (err) {
                    res.send(500, err);
                });
                readstream.on('data', function (chunk) {
                  console.log("da")
                  bufs.push(chunk);
                });
                readstream.on('end', function () {
                  var fbuf = Buffer.concat(bufs);
                  var base64 = (fbuf.toString());
                  res.send(base64);
                });
            }
        });
      }

    controller.getStep = function(req, res) {
      Step.findOne({_id: req.params.id})
      .populate("club")
      .populate({path: "entries", populate: {path: "user category"}})
      .exec(function(err, steps){
        res.json(steps)
      });
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

    controller.updateStep = function(req, res) {
      console.log("updated")
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
      console.log("add")

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
