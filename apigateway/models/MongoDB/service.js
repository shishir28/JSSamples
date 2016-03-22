
var mongoose = require('mongoose');
var RoleSchema = require('./role');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var ServiceSchema = new Schema({
    id: ObjectId,
    appName: String,
    hostName: String,
    port: String,
    service: String,
    method: String,
});

var ServiceRoleSchema = new Schema({
    id: ObjectId,
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }
});

module.exports =
{
    Service: mongoose.model('Service', ServiceSchema),
    ServiceRole: mongoose.model('ServiceRole', ServiceRoleSchema)
};
