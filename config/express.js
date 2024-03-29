var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cors = require('cors');
var busboy = require('connect-busboy');
var json2xls = require('json2xls');


module.exports = function() {
    process.env.AWS_ACCESS_KEY_ID = "AKIAIHCNUOOH6WBS4IVA"
    process.env.AWS_SECRET_ACCESS_KEY = "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"
    var passport = require('passport');
    var app = express();
    var whitelist = [
        'http://localhost:3001',
        'http://127.0.0.1:3001',
        'http://127.0.0.1:3000'
    ];
    var corsOptions = {
        origin: function(origin, callback){
            var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
            callback(null, originIsWhitelisted);
        },
        credentials: true
    };
    app.use(cors(corsOptions));

    //port of service
    app.set('port', process.env.PORT || 3000);
    app.use(json2xls.middleware);


    //middleware
    app.use(express.static('./dist'));
    // app.set('view engine', 'ejs');
    // app.set('views', './app/views');
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use(busboy());
    var cookieParser = require('cookie-parser');
    var session = require('express-session');


    app.use(cookieParser());
    app.use(session({
        secret: "go go",
        resave: true,
        cookie: { secure: false, maxAge: 10 * 60 * 1000,  httpOnly: false  },
        saveUninitialized: false,

    }));
    app.use(passport.initialize());
    app.use(passport.session());

    load('models', {cwd: 'app'})
    .then('controllers')
    .then('routes')
    .into(app);

    return app;
}
