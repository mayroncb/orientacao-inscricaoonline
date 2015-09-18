var http = require('http');
var app = require('./config/express')();
var passport = require('passport');
require('./config/passport')(passport);
require('./config/db.js')('mongodb://localhost/incricaoonline');



http.createServer(app).listen(app.get('port'), function(){
    console.log('Express Server - Port: ' + app.get('port'));
})
