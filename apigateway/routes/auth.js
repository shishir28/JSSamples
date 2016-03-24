var express = require('express');
var router = express.Router();
var User = require('../models/MongoDB/user');
var tokenHelper = require('../Security/tokenHelper');

module.exports = function (passport, app) {
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
                var userInfo = {
                    id: user.id,
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    gender: user.gender,
                    address: user.address,
                    roleId: user.roleId,
                }
                var gtoken = tokenHelper.generateToken(userInfo, app.get('superSecret'));
                res.send({
                    status: 200,
                    message: 'Login Successful!',
                    token: gtoken
                    
                });
            }
        })(req, req.body.username, req.body.password, done);
    });
    return router;
};