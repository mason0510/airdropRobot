let express = require("express");
let http = require('http');
let cluster = require('cluster');
const numCPUs = require('os').cpus().length;
let Start=require('../robot/redBlack_copy');

if (cluster.isMaster) {
    console.log('[master] ' + "start master...");
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('listening', function (worker, address) {
        console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
    });
} else if (cluster.isWorker) {
    console.log('[worker] ' + "start worker ..." + cluster.worker.id);
    let app = express();
    app.get("/",function(req,res){
        console.log(req.query);
        res.send("hello go");
        //执行定时任务
        Start.start();
        console.log("执行了任务")
    });
    app.listen(3000);
}
