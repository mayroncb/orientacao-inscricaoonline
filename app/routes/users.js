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
        .get(verifyCreds, controller.listUsers)
        .post(controller.addContato);

    app.route('/users/:id')
        .get(verifyCreds, controller.obterContato)
        .delete(verifyCreds, controller.removerContato)
        .post(verifyCreds, controller.updateContato);
}
