function verifyCreds(req, res, next) {
    if(req.isAuthenticated()){
        console.log("Atenticadoooo:: ", req.session);

        return next();
    } else {
      console.log("Out:: ", req.session);
        res.status('401').json("Not autorized");
    }
}

module.exports = function(app){
    var controller = app.controllers.CompetitionController;
    app.route('/competitions')
        .get( controller.listCompetitions)//ADD Verificação na produção
        .post(controller.addCompetition); //ADD Verificação na produção

    app.route('/competitions/:id')
        .get(controller.getCompetition) //ADD Verificação na produção
        .delete(controller.removeCompetition)
        .post(controller.updateCompetition);//ADD Verificação na produção
}
