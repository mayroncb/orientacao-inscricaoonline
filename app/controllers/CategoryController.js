var sanitize = require('mongo-sanitize');
var fs = require('fs')
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
    controller.loadStates = function(req, res) {
         var states = require('../utils/estados.json');
         res.json(states);
    }


    return controller;
}
