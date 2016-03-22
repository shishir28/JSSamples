var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var RoleSchema = new Schema({
    id: ObjectId,
    rolename: String
});
module.exports = mongoose.model('Role', RoleSchema);
