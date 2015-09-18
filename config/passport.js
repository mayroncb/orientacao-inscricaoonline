var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var mongoose = require('mongoose');


// expose this function to our app using module.exports
module.exports = function(passport) {

    var User = mongoose.model('User');

    passport.use(new Strategy(
        {
        usernameField : 'name',
        passwordField : 'pass',
        passReqToCallback : false // allows us to pass back the entire request to the callback
    },
    function(name, pass, done) {
            console.log(' profile::: ', name, pass);
			User.findOne({ 'name' :  name },
            function(err, user) {
                if(err || !user) {
                    console.log('error:: ', err);
                    return done(err);
                } else {
				   return done(null, user);
                   console.log(user)
                }

			});

    }));




    passport.serializeUser(function(user, done) {
        console.log('serializeUser::: ', user.id)
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};
