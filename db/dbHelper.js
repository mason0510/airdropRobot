
'use strict'
let mongoose = require('mongoose');
let config = require('../config');
mongoose.connect(`mongodb://localhost:27017/${config.DB}`)

let db = mongoose.connection;

let init=async ()=> {
    db.on('error', err => {
        console.log(err.toString());
    });

    db.once('open', () => {
        console.log('mongodb connect successfully!');
        return true;


    })
}
//获取用户

module.exports={init}