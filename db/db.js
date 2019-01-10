'use strict'
let mongoose = require('mongoose');
let config = require('../config');
mongoose.connect(`mongodb://localhost:27017/${config.DB}`)

let db = mongoose.connection;
db.on('error', err=>{
  console.log(err.toString());
});
let result=db.once('open', ()=>{
  console.log('mongodb connect successfully!');
  result=true;
  return result;
})
module.exports={result}