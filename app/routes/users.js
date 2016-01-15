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
    var controller = app.controllers.UserController;
    app.route('/users')
        .get(controller.listUsers)
        .post(controller.addContato);

    app.route('/users/:id')
        .get( controller.obterContato) //ADD Verificação na produção
        .delete(verifyCreds, controller.removerContato)
        .post(controller.updateContato);

    app.route('/users/q/:text')
        .get(controller.getUserByName) //ADD Verificação na produção
}
