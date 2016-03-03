
var moment = require('moment');
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var Busboy = require('busboy');
var fs = require('fs');
var json2xls = require('json2xls');

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

    controller.entriesByListOfUsers = function(req, res) {
        Entry.conut({user: {$in:
           [req.query.ids]}, status: "Aceita"
         }).exec(function(err, n){
           console.log(":::::::: ", n)
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

    controller.getEntriesByStep = function(req, res) {
      Entry.find({
        step: req.params.id,
        status: "Aceita"
      }).lean().exec(function(err, entries){
        Entry.deepPopulate(entries, 'user.club step category', function(err, docs){
           res.json(docs);
        })
      })
    }
    controller.getEntriesByStepReport = function(req, res) {

       Entry.find({
        step: req.query.id,
        status: "Aceita"
      }).lean().exec(function(err, entries) {
        Entry.deepPopulate(entries, 'user.club step category, ', function(err, results) {
          var listToReport = [];
           results.forEach(function(value, index) {
            var entryTmp = {};
            entryTmp.CAT = value.category.name
            entryTmp.NOME = value.user.name;
            entryTmp.NR = value.user.cboNumber;
            entryTmp.SICARD = value.user.siCardNumber;
            entryTmp.CLUBE = value.user.club.name;
            value.items.forEach(function(item, index) {
              if (item.name === "Inscrição") {
                entryTmp['VL INSCRIÇÃO'] = 'R$ ' + item.value + ".00";
              }
              if (item.name === "Alugel do SICard") {
                 entryTmp['VL SICARD'] = 'R$ ' + item.value + ".00";
              }
              if (item.name === "Anuidade") {
                 entryTmp.ANUIDADE = 'R$ ' + item.value + ".00";
              }
            })
            listToReport.push(entryTmp);
          })
          if (results) {
            var name = results[0].step.name.split(" ").join("_");
            var locate = results[0].step.locate.split(" ").join("_");
            res.xls(name+"-"+locate+".xlsx", listToReport)
          } else {
            res.status(400).end();
          }
        })
      })
    }

    controller.removeEntry = function(req, res) {
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

    return controller;
}
