// let express = require("express");
// let http = require('http');
// let cluster = require('cluster');
// const numCPUs = require('os').cpus().length;
// const app = express();
// let router=require('../router/router');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// //用于和数据库交互
// if (cluster.isMaster) {
//     console.log('[master] ' + "start master...");
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }
//     cluster.on('listening', function (worker, address) {
//         console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
//     });
// } else if (cluster.isWorker) {
//     console.log('[worker] ' + "start worker ..." + cluster.worker.id);
//     //app.use(router);
//    // app.listen(3000);
// }
// 注册body解析中间件
// 注册log中间件
// app.use(morgan('combined'));
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
// app.use(bodyParser.json());
// app.use(function (err, req, res, next) {
//     console.log(err);
//     res.send({
//         code: -1,
//         msg: err.toString()
//     })
// });


