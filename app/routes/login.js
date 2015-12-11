var passport = require('passport');
function verifyCreds(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.status('401').json("Not autorizeddd");
    }
}

module.exports = function(app){

    app.post("/login/process",  _login);

    app.get('/logout', function(req, res) {
        req.logOut(); // exposto pelo passport
        res.redirect('/');
    });

    app.get('/status',  verifyCreds);
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
            // var hour = 3600000;
            // req.session.cookie.expires = new Date(Date.now() + hour);
            // req.session.cookie.maxAge = hour;
            // req.session.cookie.path = "*";
            // req.session.save(function(err){
            //    console.log("Session Saved", req.session);
            //  });
            return res.json(req.user);
        });
    })(req, res, next);
}
