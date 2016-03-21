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
    app.route('/users/qtd')
    .get(controller.getCount); //ADD Verificação na produção

    app.route('/user/reset/:email')
    .get(controller.reset); //ADD Verificação na produção

    app.route('/user/resetpass/:id')
    .get(controller.resetPass); //ADD Verificação na produção

    app.route('/users')
        .get(controller.listUsers)
        .post(controller.addContato)

    app.route('/users/club/:id')
        .get(controller.listUsersByClub)

    app.route('/users/:id')
        .get(controller.getUser) //ADD Verificação na produção
        .delete(controller.removerContato)
        .post(controller.updateContato)

    app.route('/users/q/:text')
        .get(controller.getUserByName); //ADD Verificação na produção

}
