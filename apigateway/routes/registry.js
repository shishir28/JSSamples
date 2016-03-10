var svc = require('../models/MongoDB/service');
var express = require('express');
var router = express.Router();
router.get('/apps', function (req, res) {
    svc.find({}, function (req, data) {
        res.send({
            status: 200,
            services: data
        });
    });
});

router.delete('/apps/:appName', function (req, res) {
    svc.remove({
        appName: req.param.appName
    }, function (err) {
        if (err) {
            res.status(401).send({
                status: 401,
                services: "Could not be deleted, may be bad request!"
            });
        } else {
            res.status(204).send({
                status: 204
            });
        }
    });
});

router.post('/apps', function (req, res) {
    var serviceObject = req.body;
    if (!serviceObject.appName || !serviceObject.hostName || !serviceObject.port || !serviceObject.service || !serviceObject.method) {
        res.status(401).send({
            status: 401,
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
                // service already exist
            } else {
                var localService = new svc();
                localService.appname = serviceObject.appName;
                localService.hostName = serviceObject.hostName;
                localService.port = serviceObject.port;
                localService.service = serviceObject.service;
                localService.method = serviceObject.method;
            }

            localService.save(function (err) {
                if (err) {
                    res.status(401).send({
                        status: 401,
                        message: 'Could not save'
                    });
                } else {
                    res.status(200).send({
                        status: 200,
                        message: 'Service registered successfully!'
                    });
                }
            });
        });

});

module.exports = router;