//define table and 绑定数据
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    rows: [{
        id:{
        type: Number,
        required: [true, "私钥不能缺少"]
    },
    end_time:{
        type: Number,
        required: [true, "私钥不能缺少"]
    },
    red_cards:[Number],
    black_cards:[Number],
    symbol:{type:String,required:[true]},
    status:Number,
    largest_winner:{type:String,required:true},
    largest_win_amount:{type:String,required:[true]}
}

],
more: {
    type: Boolean,
        required: [true, "more"]
},
created:{
    type: Date,
default: Date.now()
},
});


module.exports = mongoose.model('gametables', schema);