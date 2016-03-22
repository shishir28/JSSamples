var express = require('express');
var router = express.Router();
var roleRepo = require('../models/MongoDB/role');

router.get('/roles', function (req, res) {
    var projection = {
        __v: false,
        _id: false
    };
    roleRepo.find({}, projection, function (req, data) {
        res.send({
            status: 200,
            roles: data
        });
    });
});

router.delete('/roles/:rolename', function (req, res) {
    console.log(req.params.rolename);
    roleRepo.remove({
        rolename: req.params.rolename
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

router.post('/roles', function (req, res) {
    var roleObject = req.body;
    if (!roleObject.rolename) {
        res.status(400).send({
            status: 400,
            message: 'Bad request!'
        });
    } else
        roleRepo.findOne({
            rolename: roleObject.rolename
        }, function (err, roleObj) {
            if (err) {
                res.status(400).send({
                    status: 400,
                    message: 'Bad request!'
                });
            }
            if (roleObj) {
                res.status(400).send({
                    status: 400,
                    message: 'Role already exist!'
                });
            } else {
                var localRole = new roleRepo();
                localRole.rolename = roleObject.rolename;
                localRole.save(function (err) {
                    if (err) {
                        res.status(500).send({
                            status: 500,
                            message: err.message
                        });
                    } else {
                        res.status(200).send({
                            status: 200,
                            message: 'Role created successfully!'
                        });
                    }
                });
            }
        });
});

module.exports = router;
