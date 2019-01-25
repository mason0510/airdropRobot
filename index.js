require('./db/db');
//require('express-async-errors');
const config = require('./config/configdb');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express')
const app = express();

let Router=require('./router/router');
let cluster = require('cluster');
const numCPUs = require('os').cpus().length;
//require('express-async-errors');
// 注册log中间件
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use((err,req,res,next)=>{
    console.log(err);
    res.send({
        code:-1,
        msg:err.toString()
    });
    next();
});


app.use("/api",Router);
app.use(require("./middleware/res_md"));


//永久开启
if (cluster.isMaster) {
    console.log('[master] ' + "start master...");
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('listening', function (worker, address) {
        console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
    });
} else if (cluster.isWorker) {
    console.log('[worker] ' + "start worker ..." + cluster.worker.id);
    app.listen(config.PORT);
}


// app.listen(config.PORT);
