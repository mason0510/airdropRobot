//define table and 绑定数据
const mongoose = require('mongoose')

const assetSchema = mongoose.Schema({
    0100 : {type: String}
})

const schema = new mongoose.Schema({
    b1: {
        type: String,
        required: [true, "用户名不能缺少"]
    },
    0x00000000000000000000000000000000000000b1: {
        type: String
    },
    EOS5cujNHGMYZZ2tgByyNEUaoPLFhZVmGXbZc9BLJeQkKZFqGYEiQ:{
        type:String
    },
    100000000: [ {0100 : {type: String}}]
});

module.exports = mongoose.model('allusers', schema);