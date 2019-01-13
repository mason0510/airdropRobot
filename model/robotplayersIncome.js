// name (key):     115hyffjphfr
// in:             15000
// out:            10000
// play_times:     3
// last_play_time: 1547005306
// event_in:       15000

//define table and 绑定数据
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    in:{
      type:Number,
      required:true
    },
    out:{
        type:Number,
        required:true,
    },
    play_times:{
        type:String,
        required:true
    },
    last_play_time:{
      type:String,
      require:true
    },
    created:{
        type: Date,
        default: Date.now()
    },
});


module.exports = mongoose.model('robotIncomePlayers', schema);