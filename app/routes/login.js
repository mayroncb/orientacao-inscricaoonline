var passport = require('passport');


function verifyCreds(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.status('401').json("Not autorizeddd");
    }
}

module.exports = function(app) {

    app.post("/login/process",  _login);

    app.get('/logout', function(req, res) {
        req.logOut(); // exposto pelo passport
        res.redirect('/');
    });

    app.get('/env',  function(req, res) {
      res.send(process.env)
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
            return res.json(req.user);
        });
    })(req, res, next);
}
