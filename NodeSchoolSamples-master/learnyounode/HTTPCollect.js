var http = require('http');
var dataResult = "";
http.get(process.argv[2], function (response) {
    response.setEncoding('utf8');
    response.on('data', function (data) {
        dataResult = dataResult + data;
    });

    response.on('end', function () {
        console.log(dataResult.length);
        console.log(dataResult);
    });
    response.on('error', function (e) {
        console.log( e.Message);
    });
});