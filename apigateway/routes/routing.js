var svc = require('../models/MongoDB/service').Service;
var svcRole = require('../models/MongoDB/service').ServiceRole;
var express = require('express');
var requestify = require('requestify');
var tokenHelper = require('../Security/tokenHelper');
var Role = require('../models/MongoDB/role');
var router = express.Router();

// Module to facilitate routing
module.exports = function (app) {
    router.all("/apps/:appName*", function (req, res) {
        svc.find({
            "appName": req.params.appName
        }, function (err, serviceObject) {
            if (serviceObject.length === 0) {
                res.status(400).send({
                    status: 400,
                    message: 'Bad request!'
                });
            } else {
                var authToken = req.body.token || req.query.token || req.headers['x-access-token'];
                if (!authToken) {
                    res.status(401).send({
                        status: 401,
                        message: 'Unauthorized!'
                    });
                }

                if (serviceObject[0].method.toUpperCase().trim() == req.method.toUpperCase().trim()) {
                    var userObject = tokenHelper.decodeToken(authToken.trim(), app.get('superSecret')).payload;

                    svcRole.findOne({
                        "roleId": userObject.roleId
                    }, function (err, serviceRoleObject) {


                        if ((serviceRoleObject) && (new String(serviceRoleObject.serviceId).valueOf() == new String(serviceObject[0]._id).valueOf())) {
                            var targetURL = 'http://' + serviceObject[0].hostName.trim() + (serviceObject[0].port ? ":" + serviceObject[0].port.trim() : "") + "/" + serviceObject[0].service;
                            if (req.params[0]) {
                                targetURL = targetURL + '/' + req.params[0];
                            }
                            requestify.request(targetURL, {
                                method: req.method,
                                body: req.body,
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }).then(function (response) {
                                res.send(response.getBody());
                            });
                        } else {
                            res.status(403).send({
                                status: 403,
                                message: 'Forbidden!'
                            });
                        }
                    });
                } else {
                    res.status(400).send({
                        status: 400,
                        message: 'Bad request!'
                    });
                }
            }
        });
    });
    return router;
}