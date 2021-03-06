var svc = require('../models/MongoDB/service').Service;
var svcRole = require('../models/MongoDB/service').ServiceRole;

var express = require('express');
var router = express.Router();

// Module to administer registration of services
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
        }
    });
});

router.post('/apps', function (req, res) {
    var serviceObject = req.body;
    if (!serviceObject.appName || !serviceObject.hostName || !serviceObject.port || !serviceObject.service || !serviceObject.method) {
        res.status(400).send({
            status: 400,
            message: 'Bad request!'
        });
    } else {
        svc.findOne({
            service: serviceObject.service
        }, function (err, svcObject) {
            if (err) {
                console.log(err);
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

                        res.status(200).send({
                            status: 200,
                            message: 'Service registered successfully!'
                        });
                    }
                });
            }
        });
    }
});

module.exports = router;