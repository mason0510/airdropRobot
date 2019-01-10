Eos=require("eosjs");
//连接数据库
require("../db/db")

// //延时工具
// let Ut = require("./utils/common");
//
// //获取对应的表
// let AirUser=require("./model/dice");

config={
    keyProvider: ['5JgWbqPFygNyurb888NcjpLAtZEyW5cLvMDQ8586EhisrCusxBD'], // 配置私钥字符串 私钥
    httpEndpoint: 'https://eosbp.atticlab.net', //DEV开发链url与端口 正式服务器 https://eosbp.atticlab.net
    chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906", // 通过cleos get info可以获取chainId
    expireInSeconds: 60,
    broadcast: true,
    debug: false,
    sign: true,
    authorization: null
}

//要求低版本的
eos = Eos(config);


options = {
    authorization: 'godapp.e@active',
    broadcast: true,
    sign: true
}

let from="godapp.e";
let to="shinschoiiii";
let asset='1.0000 EOS';

eos.transfer(from,to, asset, 'for otc account test', options).catch(results=>{
    console.log("err"+results);
    let from=""
    let to=""
    let asset=""
});


