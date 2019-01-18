//缓存层
'use strict'
require('./db')
let redis = require('redis');
let util = require('util');
let client = redis.createClient('redis://127.0.0.1:6379');
let getAsync = util.promisify(client.get).bind(client)
let lrangeAsync = util.promisify(client.lrange).bind(client)
let existsAsync = util.promisify(client.exists).bind(client)

//启动
client.on('error', err=>{
    console.log('redis connect fail: ' + err.toString());
});
// 将商品的数据取出来，放入redis中
async function prepareHotData() {
    let list = await Product.find();

    let key = "product";
    let data = list.reverse();
    data.forEach( d=>{
        client.lpush(key, JSON.stringify(d))
    })
}
//启动时进行 prepareHotData
async function getProductsByPage(page = 1) {
    let hasProduct = await existsAsync('product')
    if(hasProduct===1){
        let skip = (page-1)*5;
        let limit = skip+5 - 1;
        let res = await lrangeAsync('product', skip, limit)
        console.log(res);
    }else {
        // 从数据库中获取
    }

}
getProductsByPage(1);