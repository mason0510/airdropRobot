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
    created:{
        type: Date,
        default: Date.now()
    },
    assets: {
        type: String,
        required:true
    },
    network:{
        type:String,
        required:[true,"网络类型不能少"]
    }
});


module.exports = mongoose.model('companyAccount', schema);