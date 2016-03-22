var mongoose = require('mongoose');
var RoleSchema = require('./role');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var UserSchema = new Schema({
    id: ObjectId,
    username: String,
    password: String,
    email: String,
    gender: String,
    address: String,
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }
});

module.exports = mongoose.model('User', UserSchema);
