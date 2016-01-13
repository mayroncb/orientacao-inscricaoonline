multiparty = require('connect-multiparty'),
multipartyMiddleware = multiparty(),


module.exports = function(app){
    var controller = app.controllers.StepsController;
    app.route('/steps')
        .get( controller.listSteps)//ADD Verificação na produção
        .post(controller.addStep); //ADD Verificação na produção

    app.route('/steps/:id')
        .get(controller.getStep) //ADD Verificação na produção
        .delete(controller.removeStep)
        .post(controller.updateStep);//ADD Verificação na produção

    app.route('/steps/entry/:id')
        .post(multipartyMiddleware, controller.addEntry);//ADD Verificação na produção
}



function verifyCreds(req, res, next) {
    if(req.isAuthenticated()){
        console.log("Atenticadoooo:: ", req.session);

        return next();
    } else {
      console.log("Out:: ", req.session);
        res.status('401').json("Not autorized");
    }
}
