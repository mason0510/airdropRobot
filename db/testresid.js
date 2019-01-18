'use strict'
require('./db')

let redis = require('redis');
let client = redis.createClient();
let util = require('util');
let getAsync = util.promisify(client.get).bind(client);
let lrangeAsync = util.promisify(client.lrange).bind(client);
let llenAsync = util.promisify(client.llen).bind(client);

client.on('error', err=>{
    console.log('redis connect fail : '+err.toString());
});

/**
 * 字符串key/value类型的使用
 */
// async function testSetAndGet() {
//     // client.set('abc', '床前明月光，疑是地上霜')
//     let res = await getAsync('abc')
//     console.log(res);
// }
// testSetAndGet()


async function testList() {
    // 设置数据
    // client.rpush('bbb', 'a')
    // client.rpush('bbb', 'b')
    // client.rpush('bbb', 'c')

    let list = await lrangeAsync('bbb', 0 , -1)
    console.log(list);
}

// testList();

let key = 'products'
let Product = require('./model/product');
// 准备商品数据，把商品数据取出来，全部放到redis中
async function prepareHotData() {
    let products = await Product.find()
    console.log(products);
    products.forEach( p=>{
        client.rpush(key, JSON.stringify(p))
    });
}
// 热数据的准备，可以在项目启动的时候调用，也可以在用户访问频率较低的深夜调用
// prepareHotData();

let config = require('./config');

// 从redis中取商品数据
async function getProductsFromRedisByPage(page = 1) {
    let len = await llenAsync(key);
    if(len > 0){
        // 从redis中获取数据，然后返回
        let skip = (page-1)*config.PageCount;
        let stop = skip + config.PageCount - 1;
        let list = await lrangeAsync(key, skip, stop)
        console.log(list);
        return list
    }else {
        // redis没有数据，应该从mongodb中取
        return await Product.find().skip( (page-1)*config.PageCount ).limit(config.PageCount)
            .sort("created").select("-__v")
    }


}

getProductsFromRedisByPage(2)