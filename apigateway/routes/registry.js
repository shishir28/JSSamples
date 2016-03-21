var svc = require('../models/MongoDB/service');
var express = require('express');
var requestify = require('requestify');
var router = express.Router();
router.get('/apps', function (req, res) {
    var projection = {
        __v: false,
        _id: false
    };
    svc.find({}, projection, function (req, data) {
        res.send({
            status: 200,
            services: data
        });
    });
});

router.delete('/apps/:appName', function (req, res) {
    svc.remove({
        appName: req.params.appName
    }, function (err) {
        if (err) {
            res.status(400).send({
                status: 400,
                message: err.message
            });
        } else {
            res.status(204).send({
                status: 204
            });
            //            res.status(200).send({
            //                status: 200,
            //                message: req.params.appName + ' removed'
            //            });
        }
    });
});

router.post('/apps', function (req, res) {
    console.log(req.body);
    var serviceObject = req.body;

    if (!serviceObject.appName || !serviceObject.hostName || !serviceObject.port || !serviceObject.service || !serviceObject.method) {
        res.status(400).send({
            status: 400,
            message: 'Bad request!'
        });
    } else
        svc.findOne({
            service: serviceObject.service
        }, function (err, svcObject) {
            if (err) {
                res.status(400).send({
                    status: 400,
                    message: 'Bad request!'
                });
            }
            if (svcObject) {
                res.status(400).send({
                    status: 400,
                    message: 'Service already exist!'
                });
            } else {
                var localService = new svc();
                localService.appName = serviceObject.appName;
                localService.hostName = serviceObject.hostName;
                localService.port = serviceObject.port;
                localService.service = serviceObject.service;
                localService.method = serviceObject.method;
                localService.save(function (err) {
                    if (err) {
                        res.status(500).send({
                            status: 500,
                            message: err.message
                        });
                    } else {
                        console.log("Service " + localService.appName + " Registered at: http://" + localService.hostName + ":" + localService.port + localService.service + " with " + localService.method + " method");
                        res.status(200).send({
                            status: 200,
                            message: 'Service registered successfully!'
                        });
                    }
                });
            }
        });
});


roruter.all("/service/:serviceName*", function (req, res) {
    svc.find({
        "appName": req.params.serviceName
    }, function (err, doc) {
        if (doc.length === 0) {
            res.status(400).send({
                status: 400,
                message: 'Bad request!'
            });
        } else {
            if (doc[0].method.toUpperCase().trim() == req.originalMethod.toUpperCase().trim()) {
                var targetURL = 'http://' + doc[0].hostName + (doc[0].port ? : doc[0].port: "") + doc[0].service + req.params[0];
                requestify.request(url, {
                    method: req.originalMethod,
                    body: req.body,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (success) {
                    res.send(response.getBody());
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
module.exports = router;