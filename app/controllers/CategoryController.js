var sanitize = require('mongo-sanitize');

module.exports = function(app) {
    var controller = {}
    var Category = app.models.Category;


    controller.loadCategories = function(req, res) {
        Category.find().exec()
            .then(
                function(categories) {
                    res.json(categories);
                },
                function(erro){
                    console.error(erro)
                    res.status(404).json(erro);
                }
            )
    }


    return controller;
}
