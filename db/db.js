'use strict'
let mongoose = require('mongoose');
let myconfig = require('../config/configdb');
let human=require('../model/humanAI');
let cluster = require('cluster');
const numCPUs = require('os').cpus().length;


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
    mongoose.connect(`mongodb://127.0.0.1:27017/${myconfig.DB}`);

    let db = mongoose.connection;
    db.on('error', err=>{
      console.log(err.toString());
    });

    let result=db.once('open', ()=>{
      console.log('mongodb connect successfully!');
      result=true;
      return result;
    });

  }
