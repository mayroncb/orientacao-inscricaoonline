module.exports = function(app){
    var controller = app.controllers.ClubController;

    app.route('/clubs')
        .get(controller.loadClubs)
        .post(controller.addClub); //ADD Verificação na produção

    app.route('/clubs/qtd')
        .get(controller.getCount) //ADD Verificação na produção

    app.route('/club/admin/:id')
        .get(controller.getClubByAdmin) //ADD Verificação na produção

    app.route('/clubs/:id')
        .get(controller.getClub) //ADD Verificação na produção
        .delete(controller.removeClub)
        .post(controller.updateClub);//ADD Verificação na produção
}



function verifyCreds(req, res, next) {
    if(req.isAuthenticated()){
        console.log("Auth:: ", req.session);

        return next();
    } else {
      console.log("Out:: ", req.session);
        res.status('401').json("Not autorized");
    }
}
