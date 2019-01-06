//const { Api, JsonRpc, RpcError ,Eos} = require('eosjs');

// 只有在node.js环境下，才需要以下模组； 浏览器不需要引入这个模组。
// const fetch = require('node-fetch');
// // 只有在node.js / IE11 /IE Edge 浏览器环境下，需要以下模组；
// const { TextDecoder, TextEncoder } = require('text-encoding');


//
// const JsSignatureProvider = require('eosjs/dist/eosjs-jssig').default;
//
// const defaultPrivateKey = "5KNf32JrmzQHdvvVU62FvSR8HxDHfaceqBSQxvmp5eQiw4yQNNr";
//
// const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
//
//
// // rpc 对象可以运行 eos的rpc命令
// // rpc 命令查询 https://eosio.github.io/eosjs/classes/json_rpc.jsonrpc.html
// const rpc = new JsonRpc('https://eosbp.atticlab.net', { fetch });
//
//
// // api 对象可以运行eos的合约，比如转账，创建账号等等(需要费用的操作)
// const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });


const { Api, JsonRpc } = require('eosjs');

// 只有在node.js环境下，才需要以下模组； 浏览器不需要引入这个模组。
const fetch = require('node-fetch');
// 只有在node.js / IE11 /IE Edge 浏览器环境下，需要以下模组；
const { TextDecoder, TextEncoder } = require('text-encoding');

const JsSignatureProvider = require('eosjs/dist/eosjs-jssig').default;

// 这里的私钥填写刚才生成的私钥
//eos
const privateKey = "";
//LUCK
//  const privateKey = "5KNf32JrmzQHdvvVU62FvSR8HxDHfaceqBSQxvmp5eQiw4yQNNr";


const signatureProvider = new JsSignatureProvider([privateKey]);

// rpc 对象可以运行 eos的rpc命令
// rpc 命令查询 https://eosio.github.io/eosjs/classes/json_rpc.jsonrpc.html
const rpc = new JsonRpc('https://eos.greymass.com', { fetch });


// api 对象可以运行eos的合约，比如转账，创建账号等等(需要费用的操作)
const api1 = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });


// module.exports={api,_api2:({
//     function(pravitekey){
//         const signatureProvider = new JsSignatureProvider([pravitekey]);
//         return new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
//     })()
// }
module.exports={
        api: {
            myFunc : function (pravitekey) {
                        const signatureProvider = new JsSignatureProvider([pravitekey]);
                return new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
            }
        },
        api1
}


