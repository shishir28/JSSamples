var fs = require('fs');

module.exports = function (directory, extension, callback) {
    var regex = new RegExp('\\.' + extension + '$');
    fs.readdir(directory, function (err, list) {
        if (err) {
            return callback(err);
        }
        var files = [];
        for (idx in list) {
            var filName = list[idx];
            if (regex.test(filName)) {
                files.push(list[idx]);
            }

        }
        callback(null, files);
    });
}
//module.exports  = mymodule;