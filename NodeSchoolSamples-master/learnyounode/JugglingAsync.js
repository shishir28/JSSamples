var http = require('http');

var dataResult1 = "";


http.get(process.argv[2], function (response) {
    response.setEncoding('utf8');
    response.on('data', function (data) {
        dataResult1 = dataResult1 + data;
    });
    response.on('end', function (data) {
        console.log(dataResult1);
        dataResult1 = "";
        http.get(process.argv[3], function (response) {
            response.setEncoding('utf8');
            response.on('data', function (data) {
                dataResult1 = dataResult1 + data;
            });
            response.on('end', function (data) {
                console.log(dataResult1);
		dataResult1 = "";
                http.get(process.argv[4], function (response) {
                    response.setEncoding('utf8');
                    response.on('data', function (data) {
                        dataResult1 = dataResult1 + data;
                    });
                    response.on('end', function (data) {
                        console.log(dataResult1);

                    });
                });
            });
        });
    });
});