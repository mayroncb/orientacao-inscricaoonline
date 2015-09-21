var passport = require('passport');
module.exports = function(app){
    var controller = app.controllers.CategoryController;

    app.post("/login/process", passport.authenticate('local', {
        successRedirect : '/'
    }));

    app.get('/logout', function(req, res) {
        req.logOut(); // exposto pelo passport
        res.redirect('/');
    });


}
