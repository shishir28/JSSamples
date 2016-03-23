var express = require('express');
var router = express.Router();
var roleRepo = require('../models/MongoDB/role');
var svc = require('../models/MongoDB/service').Service;
var svcRole = require('../models/MongoDB/service').ServiceRole;


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


router.post('/approles', function (req, res) {
    var appRoleObject = req.body;
    if (!appRoleObject.rolename || !appRoleObject.appname) {
        res.status(400).send({
            status: 400,
            message: 'Bad request!'
        });
    } else {
        roleRepo.findOne({
            'rolename': appRoleObject.rolename
        }, function (err, role) {
            if (err) {
                return done(err);
            }
            // role does not  exists
            if (!role) {
                res.status(400).send({
                    status: 400,
                    message: 'Invalid role name!'
                });
            } else {
                svc.findOne({
                    service: appRoleObject.appname
                }, function (err, svcObject) {
                    if (err) {
                        return done(err);
                    }
                    // service does not  exists
                    if (!svcObject) {
                        res.status(400).send({
                            status: 400,
                            message: 'Invalid app name!'
                        });
                    } else {
                        var localServiceRole = new svcRole();
                        localServiceRole.serviceId = svcObject;
                        localServiceRole.roleId = role;
                        localServiceRole.save(function (err) {
                            if (err) {
                                res.status(500).send({
                                    status: 500,
                                    message: err.message
                                });
                            } else {
                                res.status(200).send({
                                    status: 200,
                                    message: 'Role was assigned to service successfully!'
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});

module.exports = router;