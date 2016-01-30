
var moment = require('moment');
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var Busboy = require('busboy');
var fs = require('fs');
var AWS = require('aws-sdk');
module.exports = function(app) {

    var controller = {}
    var Entry = app.models.Entry;
    var Step = app.models.Step;
    var gfs;

    mongoose.connection.on('connected', function(){
      Grid.mongo = mongoose.mongo;
      var db = mongoose.connection.db;
      gfs = new Grid(db);
    });

    // var s3 = new AWS.S3();
    // s3.listBuckets(function(err, data) {
    //   if (err) { console.log("Error:", err); }
    //   else {
    //     for (var index in data.Buckets) {
    //       var bucket = data.Buckets[index];
    //       console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
    //     }
    //   }
    // });


    controller.entries = function(req, res) {
        Entry.find({})
        .populate("user")
        .populate("category")
        .exec(function(err, entries){
            res.json(entries)
        });
    }

    controller.entriesByUser = function(req, res) {
        Entry.find({user: req.params.id})
        .populate("user")
        .populate("category")
        .exec(function(err, entries){
            res.json(entries)
        });
    }

    controller.loadQtdEntriesByUser = function(req, res) {
      Entry.find({user: req.params.id, status: "Aceita"})
      .exec(function(err, entries){
          res.send({"value":entries.length})
      });
    }
    controller.loadComp = function(req, res) {
        gfs.findOne({ _id: req.query.id}, function(err, file) {
            if(err) {
                res.status(404).end();
            } else if(!file){
                res.status(404).end();
            } else {
                var readstream = gfs.createReadStream({
                  _id: file._id
                });
                var bufs = [];

                readstream.on('error', function (err) {
                    res.send(500, err);
                });
                readstream.on('data', function (chunk) {
                  bufs.push(chunk);
                });
                readstream.on('end', function () {
                  var fbuf = Buffer.concat(bufs);
                  var base64 = (fbuf.toString('base64'));
                  res.send(base64);
                });
            }
        });
      }

    controller.getEntry = function(req, res) {
        Entry.findOne({_id: req.params.id}, function(err, data) {
            // console.log(data);
            res.json(data);
        })
    }

    controller.removeEntry = function(req, res) {
        console.log("removed: ", req.params.id);
        Entry.findOne({_id: req.params.id}, function(err, data) {
            data.delete(function(err) {
              if (err) {
                data.remove(function(err, pro) {
                })
              };
              Step.update(
                {_id: data.step},
                {$pull: {entries: req.params.id}}, function(err, ok){
                  console.log(err, ok);
                }
              )
            })
        })
    }

    controller.addEntry = function(req, res) {
      var file = req.files.file;
      var order = JSON.parse(req.body.order);

      var writestream = gfs.createWriteStream({
        filename: file.name,
        contentType: file.type
      });
      fs.createReadStream(file.path).pipe(writestream);

      writestream.on('close', function (file) {
        order.comp = file._id;
        Entry.create(order)
        .then(function(resp) {
            res.status(201).json(resp);
        }, function(erro){
            console.log(erro);
            res.status(500).json(erro);
        })
      });
    }

    controller.updateEntry = function(req, res) {
      Entry.findByIdAndUpdate(req.body._id, req.body).exec()
      .then(function(entry) {
         Entry.findOne({_id: entry._id}, function(err, entry) {
           Step.findOne({_id: entry.step}, function(err, step) {
               if (entry.status === "Aceita"){
                 step.entries.push(entry._id);
                 step.save();
               } else {
                 step.entries.pull(entry._id);
                 step.save();
               }
           })
          res.json(entry);
        })

      }, function(erro) {
          console.log("Erro ao atualizar!!!!");
          console.log(erro);
          res.status(500).json(erro);
      })
    }

    // controller.addStep = function(req, res) {
    //     var step = req.body;
    //
    //     step.stepDate = moment(step.stepDate, "DD-MM-YYYY");
    //     step.entryStartDate = moment(step.entryStartDate, "DD-MM-YYYY");
    //     step.entryEndDate = moment(step.entryEndDate, "DD-MM-YYYY");
    //
    //     Step.create(req.body)
    //     .then(function(step) {
    //       checkOpenSteps();
    //       Competition.findById(step.competition, function(err, comp){
    //         comp.steps.push(step);
    //         comp.save();
    //       })
    //
    //         res.status(201).json(step);
    //     }, function(erro){
    //         console.log(erro);
    //         res.status(500).json(erro);
    //     })
    // }

    return controller;
}
