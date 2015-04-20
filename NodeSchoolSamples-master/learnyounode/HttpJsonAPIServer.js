var http = require('http');
var url = require("url");

var fileServer = http.createServer(function (request, response) {
    
    response.writeHead(200, {
        'Content-Type': 'application/json'
    });

    if (request.method == 'GET') {

        var parsedUrl = url.parse(request.url, true);    
        var queryString = parsedUrl.query;
        var localTime = new Date(queryString.iso);

        if (parsedUrl.pathname === "/api/parsetime") {
            response.write(getJSONForISO(localTime));
        } else {
            response.write(getUnixTime(localTime));
        }
        response.end();
    }
});

function getUnixTime(localTime) {
    var value = localTime.getTime();
    return JSON.stringify({
        unixtime: value
    });
}

function getJSONForISO(localTime) {
    var hours = localTime.getHours();
    var minutes = localTime.getMinutes();
    var seconds = localTime.getSeconds();

    return JSON.stringify({
        hour: hours,
        minute: minutes,
        second: seconds
    });
}

fileServer.listen(8000);