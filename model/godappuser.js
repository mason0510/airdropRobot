//define table and 绑定数据
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "用户名不能缺少"]
    },
    assets: {
        type: String
    },
    block_time:{
        type:String
    },
    trx_id:{
        type:String
    },
    memo:{
        type:String
    },
    created:{
        type: Date,
        default: Date.now()
    },
    isDrop:{
        type:Boolean,
        required: true,
        default: false
    }
});


module.exports = mongoose.model('godappusers', schema);