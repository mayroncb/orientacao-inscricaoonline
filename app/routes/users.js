function verifyCreds(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.status('401').json("Not autorized");
    }
}

module.exports = function(app){
    var controller = app.controllers.UserController;
    app.route('/users')
        .get(verifyCreds, controller.listarContatos)
        .post(controller.updateContato);

    app.route('/users/:id')
        .get(verifyCreds, controller.obterContato)
        .delete(verifyCreds, controller.removerContato);


}
