//define table and 绑定数据
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "用户名不能缺少"]
    },
    assets: {
        type: String,
        // min: [0, "资产不能小于0"],
        // max: [1000000000, "资产不能大于1000000000"]
    },
    created:{
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('betdiceusers', schema);