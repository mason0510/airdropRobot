// //获取eos实例
//
let request = require("request");
//获取eos
Eos=require("eosjs");
//连接数据库

let count=0;
let querytable=async (username)=> {
    let options = { method: 'POST',
        url: 'https://eosbp.atticlab.net/v1/chain/get_account',
        body: { account_name: username },
        json: true };

    await request(options, async function (error, response, body) {
        if (error) {
            if (body!==null){
                console.log("当前账户是问题账户"+body);
                throw new Error(error);
            }
        } else {
            console.log("第" + count + "次审查" + username + "===" + "body.ram_quota" + body.ram_quota.used + "===" + "body.cpu_limit" + body.cpu_limit.used);
            //计算cpu 和net 80
        }

    });
}

module.exports={querytable};

