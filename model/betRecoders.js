//define table and 绑定数据
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    accountname: {
        type: String,
        required: [true, "用户名不能缺少"]
    },
    privatekey: {
        type: String,
        required: [true, "私钥不能缺少"]
    },
    publickey: {
        type: String,
        required: [true, "公钥不能缺少"]
    },
    net_limit: { used: {type:Number}, available: {type:Number}, max: {type:Number} },
    cpu_limit: { used: {type:Number}, available: {type:Number}, max: {type:Number} },
    ram_usage: {type:Number},

    assets: {
        type: String,
        required:true
    },
    network:{
        type:String,
        required:[true,"网络类型不能少"]
    },
    active:{
        type:Boolean,
        required:[true,"类型不能少"]
    },
    created:{
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('betRecords', schema);