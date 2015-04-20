var http = require('http');
var fs = require('fs');

var fileServer = http.createServer(function (request, response) {

    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    var streamReader = fs.createReadStream(process.argv[2]);
    streamReader.setEncoding('utf8');    
    streamReader.on('open', function () {
        streamReader.pipe(response);
    });
    
});
fileServer.listen(8000);