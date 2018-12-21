// const { eosjs,Api, JsonRpc, RpcError,JsSignatureProvider } = require('eosjs');
// 只有在node.js环境下，才需要以下模组； 浏览器不需要引入这个模组。
const fetch = require('node-fetch');
// 只有在node.js / IE11 /IE Edge 浏览器环境下，需要以下模组；
const { TextDecoder, TextEncoder } = require('text-encoding');
// const JsSignatureProvider = require('eosjs/dist/eosjs-jssig');

// const JsSignatureProvider=require ('eosjs')
// 这里的私钥填写刚才生成的私钥
const defaultPrivateKey = "5Jg3KWnT2cUsKvmiJYRo7iULfwyhunVU3uDrZEAvjtq2GpABiJQ"; // useraaaaaaaa
const signatureProvider =new JsSignatureProvider([defaultPrivateKey]).catch(errmsg=>{console.log(errmsg)})

// rpc 对象可以运行 eos的rpc命令
// rpc 命令查询 https://eosio.github.io/eosjs/classes/json_rpc.jsonrpc.html
const rpc = new JsonRpc('http://junglehistory.cryptolions.io:18888', { fetch });


// api 对象可以运行eos的合约，比如转账，创建账号等等(需要费用的操作)
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

