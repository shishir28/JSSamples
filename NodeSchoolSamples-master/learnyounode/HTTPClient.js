var http = require('http');

http.get(process.argv[2], function (response) {
    response.setEncoding('utf8');
    response.on('data', function (data) {
        console.log(data);
    });

    response.on('end', function () {});
    response.on('error', function (e) {
        console.log("Got Error while retrieving " + process.argv[2] + " " + e.Message);
    });
});