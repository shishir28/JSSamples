var net = require('net');
var timeServer = net.createServer(function (socket) {
  
    socket.end(displayTime());
});


function displayTime() {
    var localTime = new Date();
    var year = localTime.getFullYear();
    var month = ('0' + (localTime.getMonth() + 1)).slice(-2);
    var date = ('0' + localTime.getDate()).slice(-2);
    var hours = ('0' + localTime.getHours()).slice(-2);    
    
    var minutes = ('0' + localTime.getMinutes()).slice(-2)    ;

    return year.toString()+ "-" + month + "-" + date + " " + hours + ":" + minutes;
}

timeServer.listen(8000);