Eos=require("eosjs");
//连接数据库
require("./db")

//延时工具
let Ut = require("./utils/common");

//获取对应的表
let AirUser=require("./model/godappusr");

config={
    keyProvider: ['5JgWbqPFygNyurb888NcjpLAtZEyW5cLvMDQ8586EhisrCusxBD'], // 配置私钥字符串 私钥
    httpEndpoint: 'https://eos.greymass.com', //DEV开发链url与端口 正式服务器 https://eosbp.atticlab.net
    chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906", // 通过cleos get info可以获取chainId
    expireInSeconds: 60,
    broadcast: true,
    debug: false,
    sign: true,
    authorization: null
}

//要求低版本的
eos = Eos(config);


// options = {
//     authorization: 'godapp.e@active',
//     broadcast: true,
//     sign: true
// }
options = {
    authorization: 'godapp.e@active',
    broadcast: true,
    sign: true
}

let count=0;
let memo="You HAVE know what GoDapp is if you're an EOS loyal supporter. Our website: godapp.com 如果你是eos的忠实支持者，最好了解一下godapp是什么，我们的官网 godapp.com"

//查询所有不重复的用户
const airdrop=async (username)=>{
            console.log("当前账户" + username + "总第" + count + "次转账")
            eos.transfer('godapp.e', username, '0.0001 EOS',memo
                , options).catch(results => {
                console.log(results);
                // 再次空投
                eos.transfer('godapp.e', results[i].username, '0.0001 EOS', "You'd better to know what GODAPP is if you're an EOS  loyal supporter. Official webisite is: godapp.com \n" +
                    "如果你是eos的忠实支持者，最好了解一下godapp是什么，我们的官网 godapp.com", options).catch(results => {
                    console.log("结束"+results);
                    // 再次空投
                })
            })
    }
};

airdrop().catch(err=>{
    console.log("result"+err);

    //切换节点 再次空投
});




