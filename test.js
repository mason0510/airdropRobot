const { Api, JsonRpc } = require('eosjs');

// 只有在node.js环境下，才需要以下模组； 浏览器不需要引入这个模组。
const fetch = require('node-fetch');
// 只有在node.js / IE11 /IE Edge 浏览器环境下，需要以下模组；
const { TextDecoder, TextEncoder } = require('text-encoding');

const JsSignatureProvider = require('eosjs/dist/eosjs-jssig').default;

// 这里的私钥填写刚才生成的私钥
const privateKey = "5KNf32JrmzQHdvvVU62FvSR8HxDHfaceqBSQxvmp5eQiw4yQNNr";
const signatureProvider = new JsSignatureProvider([privateKey]);

// rpc 对象可以运行 eos的rpc命令
// rpc 命令查询 https://eosio.github.io/eosjs/classes/json_rpc.jsonrpc.html
const rpc = new JsonRpc('http://api3.eosmetal.io', { fetch });


// api 对象可以运行eos的合约，比如转账，创建账号等等(需要费用的操作)
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });



const transfer = async () => {
    const result = await api.transact({
        actions: [{
            account: 'eosluckcoin1',
            name: 'transfer',
            authorization: [{
                actor: 'eosluckcoin1',
                permission: 'active',
            }],
            data: {
                from: 'eosluckcoin1',
                to: 'zhangaccount',
                quantity: '10.1234 LUCK',
                memo: '',
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30,
    });
    console.dir(result);
};


transfer().catch(err=>{
    console.log("transfer error: ",err)
});