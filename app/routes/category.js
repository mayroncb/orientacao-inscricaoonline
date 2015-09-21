module.exports = function(app){
    var controller = app.controllers.CategoryController;

    app.route('/categories')
        .get(controller.loadCategories);

}
