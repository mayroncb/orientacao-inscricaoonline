module.exports = function(app){
    var controller = app.controllers.CategoryController;

    app.route('/categories')
        .get(controller.loadCategories);

    app.route('/states')
        .get(controller.loadStates);

    app.route('/status')
        .get(controller.loadStatus);

}
