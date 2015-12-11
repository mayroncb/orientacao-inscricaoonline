var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var moment = require('moment');
var passHandler = require('../app/utils/passHandler');


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
			User.findOne({ 'email' :  name },
            function(err, user) {
                if(err || !user) {
                    console.log('error:: ', err);
                    return done(err);
                } else {
                   if (passHandler.validPassword(pass, user.password)) {
                    // console.log("before::, ", moment("2014-02-02T15:00:00-0800").format("DD/MM/YYYY"));
                    // user['dateBirth'] = moment("2014-02-02T15:00:00-0800").format("DD/MM/YYYY");
                    // console.log("after::, ", user.dateBirth);
                       return done(null, user);
                   } else {
                       console.log('error:: ', err);
                       return done(err);
                   }
                }
			});
    }));

    passport.serializeUser(function(user, done) {
        // console.log('serializeUser::: ', user.id)
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        // console.log('deserializeUser::: ', id)
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};
