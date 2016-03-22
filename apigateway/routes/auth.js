var express = require('express');
var router = express.Router();
var User = require('../models/MongoDB/user');
var tokenHelper = require('../Security/tokenHelper');


module.exports = function (passport) {
    router.post('/account/register', function (req, res, done) {
        passport.authenticate('signup', function (err, user, info) {
            var msg = err ? err : (info ? info : 'Registration Successful!');
            res.send({
                status: 200,
                message: msg
            });
        })(req, req.body.username, req.body.password, done);
    });

    // Authenticate a user.
    router.post('/account/login', function (req, res, done) {
        passport.authenticate('login', function (err, user, info) {
            //res.json(401, { error: 'message' })
            var msg = err ? err : (info ? info : 'Login Successful!');
            if (err) {
                res.send({
                    status: 500,
                    message: err
                })
            } else if (info) {
                res.send({
                    status: 401,
                    message: info
                });

            } else {
                res.send({
                    status: 200,
                    message: 'Login Successful!',
                    token: tokenHelper.generateToken(user)
                });
            }

        })(req, req.body.username, req.body.password, done);
    });
    return router;
};