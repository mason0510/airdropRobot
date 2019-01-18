'use strict'
let mongoose = require('mongoose');
let myconfig = require('../config/configdb');
let human=require('../model/humanAI');

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
