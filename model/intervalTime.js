const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    common_user:{
        type: String,
        default:"internalUser",
        required: [true, "默认公共账户不能为空"],
    },
    bet_interval_count: {
        type: Number,
        required: [true, "商品数量不能为空"],
        min:[1, "当前间隔次数数量不能小于1"]
    },
    begin_time: {
        type:Number,
        required: [true, "间隔开始时间不能为空"],
        min:[parseInt((new Date().getTime())/1000), "当前间隔次数数量不能小于当前时间"]
    },
});

module.exports = mongoose.model('interval', schema);