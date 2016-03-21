var express = require('express');
var router = express.Router();
var User = require('../models/MongoDB/user');

module.exports = function (passport) {
    router.post('/account/register', function (req, res, done) {
        passport.authenticate('signup', function (err, user, info) {
            res.send({
                'status': '200'
            });

        })(req, req.body.username, req.body.password, done);
    });

    // Authenticate a user.

    router.post('/account/login', function (req, res, done) {
        passport.authenticate('login', function (err, user, info) {
            res.send({
                'status': '200'
            });

        })(req, req.body.username, req.body.password, done);
    });
    return router;
};