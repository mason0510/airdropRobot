//给指定账户进行转账

// Eos=require("eosjs")

//config
// config={
//     keyProvider: ['5JQKwqe4Sn4DAL8gZnMnEz8pYeJV5AWvPdGcRkm2BJ2HDzenW3C'], // 配置私钥字符串
//     httpEndpoint: 'https://jungle.eosio.cr', //DEV开发链url与端口
//     chainId: "038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca", // 通过cleos get info可以获取chainId
//     mockTransactions: () => null, // 如果要广播，需要设为null
//     transactionHeaders: (expireInSeconds, callback) => {
//         callback(null/*error*/, headers) //手动设置交易记录头，该方法中的callback回调函数每次交易都会被调用
//     },
//     expireInSeconds: 60,
//     broadcast: true,
//     debug: false,
//     sign: true,
//     authorization: null
// }

//使用eosjs

// EosApi = require('eosjs-api')
//
// // everything is optional
// options = {
//     httpEndpoint: 'https://jungle.eosio.cr',
//     verbose: false, // API logging
//     logger: { // Default logging functions
//         //log: config.verbose ? console.log : '',
//         error: console.error
//     },
//     fetchConfiguration: {}
// }

//eos = EosApi(options)


// eos.getBlock(10000).then(result=>{
//     console.log(result)
// })
//配置
// options = {
//     authorization: '发送方帐号@active',
//     broadcast: true,
//     sign: true
// }
Eos=require("eosjs");
config={
    keyProvider: ['5JQKwqe4Sn4DAL8gZnMnEz8pYeJV5AWvPdGcRkm2BJ2HDzenW3C'], // 配置私钥字符串 私钥
    httpEndpoint: 'https://jungle.eosio.cr', //DEV开发链url与端口 正式服务器 https://eosbp.atticlab.net
    chainId: "038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca", // 通过cleos get info可以获取chainId
    expireInSeconds: 60,
    broadcast: true,
    debug: false,
    sign: true,
    authorization: null
}

//要求低版本的
eos = Eos(config);

options = {
    authorization: 'testchintai2@active',
    broadcast: true,
    sign: true
}

//转账
eos.transfer('testchintai2', 'zhangaccount', '0.1000 EOS', '', options)