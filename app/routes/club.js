module.exports = function(app){
    var controller = app.controllers.ClubController;

    app.route('/clubs')
        .get(controller.loadClubs);

}
