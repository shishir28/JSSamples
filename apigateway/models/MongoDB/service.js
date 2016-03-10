var mongoose = require('mongoose');

module.exports = mongoose.model('Service', {
    appName: String,
    hostName: String,
    port: String,
    service: String,
    method: String
});