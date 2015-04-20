var http = require('http');
var map = require('through2-map');

var fileServer = http.createServer(function (request, response) {

    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    if (request.method == 'POST') {
        request.pipe(map(function (chunk) {
            return chunk.toString().toUpperCase();
        })).pipe(response);
    } else {
        response.write('Not post type');
        response.end();
    }
});
fileServer.listen(8000);