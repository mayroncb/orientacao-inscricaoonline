var sanitize = require('mongo-sanitize');

module.exports = function(app) {
    var controller = {}
    var Club = app.models.Club;


    controller.loadClubs = function(req, res) {
        Club.find().exec()
            .then(
                function(clubs) {
                    res.json(clubs);
                },
                function(erro){
                    console.error(erro)
                    res.status(404).json(erro);
                }
            )
    }


    return controller;
}
