//
//
// const mongoose = require('mongoose')
// require('../db')
// const schema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: [true, "用户名不能缺少"]
//     },
//     assets: {
//         type: Number,
//         min: [0, "资产不能小于0"],
//         max: [1000000000, "资产不能大于1000000000"]
//     },
//     created:{
//         type: Date,
//         default: Date.now()
//     }
// });
//
// let UserAccount = mongoose.model('useraccount', schema);
//
//
// const testsave=async ()=>{
//     console.log("testsave");
//     let res1= await User.findOne({username:"zhangaccount"});
//     if(res1){
//         throw Error("用户已存在");
//     }
//
//     let user=new User({
//         username:"zhangaccount",
//         assets:1,
//         created:Date.now()
//
//     });
//     console.log(user);
//     let res=await User.create(user);
//
//     console.log(res)
// }

// testsave().catch(err=>{
//     console.log("err",err)
// });

const { Api, JsonRpc, RpcError, JsSignatureProvider } = require('eosjs');

//生成公私钥
let ecc=require("eosjs-ecc")

const fetch = require('node-fetch');
// 只有在node.js / IE11 /IE Edge 浏览器环境下，需要以下模组；
const { TextDecoder, TextEncoder } = require('text-encoding');

// 这里的私钥填写刚才生成的私钥
const privateKey = "5JgWbqPFygNyurb888NcjpLAtZEyW5cLvMDQ8586EhisrCusxBD";
const signatureProvider = new JsSignatureProvider([privateKey]);

// api 对象可以运行eos的合约，比如转账，创建账号等等(需要费用的操作) http://junglehistory.cryptolions.io:18888
const rpc = new JsonRpc('https://eosbp.atticlab.net', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });



// ecc.randomKey().then(privateKey => {
//     console.log('Private Key:\t', privateKey) // wif
//     console.log('Public Key:\t', ecc.privateToPublic(privateKey)) // EOSkey...
// });
async function createAccount() {


const result = await api.transact({
    actions: [{
        // 这个account是指合约名
        account: 'eosio',
        // 创建新账号的action名
        name: 'newaccount',
        authorization: [{
            actor: 'godapp.e',
            permission: 'active',
        }],
        data: {
            creator: 'godapp.e',
            // 这里的name指的是新用户的名字，在内部测试时候用的是name这个字段。
            name: 'accounthouse',
            // newcat 是公测链，新用户名的参数，可能版本不一样，字段不一样
            newact:'accounthouse',
            owner: {
                threshold: 1,
                keys: [{
                    // 写入上面新生成的公钥
                    key: 'EOS68rDpkETncgn7geKwq7c5kipBcDsvv5xbymrrXkhEygTqwU35X',
                    weight: 1
                }],
                accounts: [],
                waits: []
            },
            active: {
                threshold: 1,
                keys: [{
                    // 写入上面新生成的公钥
                    key: 'EOS5EZKXhHGXfxbr72iXdBpV5mZjpF7p1vW11aiKj5BEP3f6NF88R',
                    weight: 1
                }],
                accounts: [],
                waits: []
            },
        },
    },
        {
            account: 'eosio',
            // 购买内存的action名
            name: 'buyrambytes',
            authorization: [{
                actor: 'godapp.e',
                permission: 'active',
            }],
            data: {
                payer: 'godapp.e',
                receiver: 'accounthouse',
                bytes: 3000,
            },
        },
        {
            account: 'eosio',
            // 抵押资产的action名，用于租用带宽与cpu,抵押资产,抵押的越多，带宽和cup就越多
            name: 'delegatebw',
            authorization: [{
                actor: 'godapp.e',
                permission: 'active',
            }],
            data: {
                from: 'godapp.e',
                receiver: 'accounthouse',
                // 这里的货币单位，要查询一下系统货币的名称才能填，可能是SYS或者EOS
                stake_net_quantity: '5.0000 EOS',
                stake_cpu_quantity: '5.0000 EOS',
                transfer: false,
            }
        }]
}, {
    blocksBehind: 3,
    expireSeconds: 30,
});

console.log(result)

}

createAccount().catch(err=>{
    console.log("api error: ",err)
});






