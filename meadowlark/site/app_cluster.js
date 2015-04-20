var cluster = require('cluster');

function startWorker() {
    var worker = cluster.fork();
    console.log('CLUSTER work %d started', worker.id);
}
if (cluster.isMaster) {
    require('os').cpus().forEach(function () {
        startWorker();
    });
    // log any worker that disconnect an; if a worker disconnects, it should then exit
    cluster.on('disconnect', function (worker) {
        console.log('CLUSTER: Worker %d disconnected from the cluster.',
            worker.id)
    });
    // when worker dies,  create a new one to replace it 
    cluster.on('exit', function (worker, code, signal) {
        console.log('CLUSTER: Worker %d died with exit code %d (%s)',
            worker.id, code, signal);
        startWorker();
    });

} else {
    require('./app.js')();
}