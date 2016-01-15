var sanitize = require('mongo-sanitize');

module.exports = function(app) {
    var controller = {}
    var Club = app.models.Club;


    controller.loadClubs = function(req, res) {
        Club.find({})
        .populate('admin').exec()
            .then(
                function(clubs) {
                    res.status(200).json(clubs);
                },
                function(erro){
                    console.error(erro)
                    res.status(404).json(erro);
                }
            )
    }

    // controller.listCompetitions = function(req, res) {
    //     Competition.find({})
    //     .populate({path: "steps", populate: {path: "club"}})
    //     .exec(function(err, competitions){
    //         res.json(competitions);
    //     });
    //
    // }

    controller.getClub = function(req, res) {
        Competition.findOne({_id: req.params.id}, function(err, data) {
            // console.log(data);
            res.json(data);
        })
    }

    controller.removeClub = function(req, res) {
        console.log("removed: ", req.params.id);
        Club.findOne({_id: req.params.id}, function(err, data) {

                data.remove(function(err, pro) {
                  res.status(200).end();
                })
              });
        }


    controller.updateClub = function(req, res) {
      Club.findByIdAndUpdate(req.body._id, req.body).exec()
      .then(function(club) {
        Club.findOne({_id: club.id}, function(err, data) {
            res.json(data);
        })
      }, function(erro) {
          console.log("Erro ao atualizar!!!!");
          console.log(erro);
          res.status(500).json(erro);
      })


    }

    controller.addClub = function(req, res) {
        Club.create(req.body)
        .then(function(club) {
            res.status(201).json(club);
        }, function(erro){
            console.log(erro);
            res.status(500).json(erro);
        })
    }


    return controller;
}
