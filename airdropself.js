Eos=require("eosjs");
//连接数据库
require("./db")

//延时工具
let Ut = require("./utils/common");

//获取对应的表
let AirUser=require("./model/dice");

config={
    keyProvider: [''], // 配置私钥字符串 私钥
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


// let array1=["zzzzz2zzzzzz","miaoman12345","dennis.e","hicodemonkey"];
// array1.forEach(function(item){
//    console.log("item"+item)
//     eos.transfer('godapp.e', item, '0.001 EOS', 'You HAVE know what GoDapp is if you\'re an EOS loyal supporter. Our website: godapp.com\n' +
//         '如果你是eos的忠实支持者，最好了解一下godapp是什么，我们的官网 godapp.com', options).catch(results=>{
//         console.log("转账失败"+results);
//     })
//
// });
// eos.transfer('godapp.e', "bombdesigner", '15.80 EOS', '您好，受eos网络影响导致的吞币，我们已返还给您，如有疑问请通过godapp.com官网所留的联系方式联系我们. ', options).catch(results=>{
//     console.log("err"+results);
eos.transfer('godapp.e', "bombdesigner", '15.8000 EOS', '上传dapp,获取获胜截图,返还  ', options).catch(results=>{
    console.log("err"+results);
    //随眠一秒
    // for (let i = 0; i <3 ; i++) {
    //     eos.transfer('godapp.e', "zhangccount", '0.0001 EOS', 'You HAVE know what GoDapp is if you\'re an EOS loyal supporter. Our website: godapp.com\n' +
    //         '如果你是eos的忠实支持者，最好了解一下godapp是什么，我们的官网 godapp.com', options)
    // }
});


