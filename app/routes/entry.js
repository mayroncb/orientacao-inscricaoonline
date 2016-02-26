multiparty = require('connect-multiparty'),
multipartyMiddleware = multiparty(),


module.exports = function(app){
    var controller = app.controllers.EntryController;
    app.route('/entries')
        .get(controller.entries)//ADD Verificação na produção
        .post(multipartyMiddleware, controller.addEntry); //ADD Verificação na produção

    app.route('/entry/comp/')
        .get(controller.loadComp)//ADD Verificação na produção

    app.route('/entry/report/step/')
        .get(controller.getEntriesByStepReport)//ADD Verificação na produção

    app.route('/entries/userqtd/:id')
        .get(controller.loadQtdEntriesByUser)//ADD Verificação na produção

    app.route('/entries/user/:id')
        .get(controller.entriesByUser)//ADD Verificação na produção

    app.route('/entries/step/:id')
        .get(controller.getEntriesByStep)//ADD Verificação na produção

    app.route('/entries/:id')
        .get(controller.getEntry) //ADD Verificação na produção
        .delete(controller.removeEntry)
        .post(controller.updateEntry);//ADD Verificação na produção
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
