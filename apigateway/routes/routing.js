var svc = require('../models/MongoDB/service');
var express = require('express');
var requestify = require('requestify');
var router = express.Router();

// Module to facilitate routing

router.all("/apps/:appName*", function (req, res) {
    svc.find({
        "appName": req.params.appName
    }, function (err, doc) {
        if (doc.length === 0) {
            res.status(400).send({
                status: 400,
                message: 'Bad request!'
            });
        } else {

            if (doc[0].method.toUpperCase().trim() == req.method.toUpperCase().trim()) {
                var targetURL = 'http://' + doc[0].hostName.trim() + (doc[0].port ? ":" + doc[0].port.trim() : "") + "/" + doc[0].service;
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
                res.status(400).send({
                    status: 400,
                    message: 'Bad request!'
                });
            }
        }
    });
});
module.exports = router;