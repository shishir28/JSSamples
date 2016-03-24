var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');
var jwt = require('jsonwebtoken');

// ---------------------
var config = require('./config.js');
var mongoose = require('mongoose');
mongoose.connect(config.database);
var app = express();
app.set('superSecret', config.secret);

// Configuring Passport
app.use(expressSession({
    secret: app.get('superSecret'),
    saveUninitialized: true, // (default: true)
    resave: true, // (default: true)
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

// Get all routes reference 
var registry_routes = require('./routes/registry.js');
var routing_routes = require('./routes/routing.js')(app);
var admin_routes = require('./routes/admin.js');
var auth_routes = require('./routes/auth')(passport, app);

// Specify the routes here.

app.use('/', registry_routes);
app.use('/', routing_routes);
app.use('/', admin_routes);
app.use('/', auth_routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;