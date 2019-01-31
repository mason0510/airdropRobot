require('./db/db');
const config = require('./config/configdb');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();
let Router=require('./router/router');
let cluster = require('cluster');
const numCPUs = require('os').cpus().length;
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((err,req,res,next)=>{
    res.send({
        code:-1,
        msg:err.toString()
    });
    next();
});
app.use("/api",Router);
app.use(require("./middleware/res_md"));

if (cluster.isMaster) {
    console.log('[master] ' + "start master...");
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('listening', function (worker, address) {
        // console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
    });
} else if (cluster.isWorker) {
    //console.log('[worker] ' + "start worker ..." + cluster.worker.id);
    app.listen("3000");
}
