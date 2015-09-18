var passport = require('passport');
module.exports = function(app){
    app.post("/login/process", passport.authenticate('local', {
        successRedirect : '/'
    }));

    app.get('/logout', function(req, res) {
        req.logOut(); // exposto pelo passport
        res.redirect('/');
    });
}
