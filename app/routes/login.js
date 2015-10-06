var passport = require('passport');
module.exports = function(app){

    app.post("/login/process",  _login);

    app.get('/logout', function(req, res) {
        req.logOut(); // exposto pelo passport
        res.redirect('/');
    });


}



function _login(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(401).send({message: "Not autorized"});
        }
        req.logIn(user, function (err) {

            if (err) {
                return next(err);
            }
            console.log("_login")
            return res.json(req.user);
        });
    })(req, res, next);
}
