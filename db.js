// 'us strict'
// // //mongodb
// let MongoClient = require('mongodb').MongoClient
//     , assert = require('assert');
//
// // Connection URL
// let url = 'mongodb://localhost:27017/helloworld';
//
// // Use connect method to connect to the server
// MongoClient.connect(url);
//
// let db=MongoClient.connection;
// db.on("error",err => {
//   console.log(err.toString());
// });
// db.once("open",()=>{
//   console.log("")
// })

'use strict'
let mongoose = require('mongoose');
let config = require('./config');
mongoose.connect(`mongodb://localhost:27017/${config.DB}`)

let db = mongoose.connection;
db.on('error', err=>{
  console.log(err.toString());
});
db.once('open', ()=>{
  console.log('mongodb connect successfully!');
})