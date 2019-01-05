// //获取eos实例
//
let request = require("request");
//获取eos
Eos=require("eosjs");
//连接数据库
require("./db")
//获取
let api=require("./eoshelper");

//获取对应的表
let AirUser=require("./model/godappusr1/eosusr(0-50)");

let count=0;
let checkAccount=async (username)=> {
    let options = { method: 'POST',
        url: 'https://eosbp.atticlab.net/v1/chain/get_account',
        body: { account_name: username },
        json: true };

   await request(options, async function (error, response, body) {
        if (error) {
            console.log("当前账户是问题账户"+body.toString());
            throw new Error(error);
        } else {
            console.log("第"+count+"次审查"+username+"===" + "body.ram_quota"+body.ram_quota.used+"==="+"body.cpu_limit"+body.cpu_limit.used);
            //计算cpu 和net 80
            let netpercentage=(body.net_limit.used/body.net_limit.max)*100;
            let cpupercentage=(body.cpu_limit.used/body.cpu_limit.max)*100;
            let rampercentage=body.ram_usage;
            if (netpercentage>80||cpupercentage>80||rampercentage<2990){
                console.log("attention======为"+username+"购买 cpu net ram");
              // buycpuNet("godapp.e",username)
            }else {
                //保存数据到数据库
                let query={accountname:username};
                AirUser.findOneAndUpdate(query,
                    {net_limit: { used: body.net_limit.used, available:body.net_limit.available, max:body.net_limit.max },
                     cpu_limit: { used: body.cpu_limit.used, available:body.cpu_limit.available, max:body.cpu_limit.max },
                     ram_usage: body.ram_usage,
                     assets:body.core_liquid_balance
                    },
                    {multi: true},()=>{
                    console.log(username+"======"+"status success");
                })
            }

        }

    });
}
//去购买cpu 和net

const buycpuNet=async (bankaccount,username) => {
            await api.transact({
                actions:
                    [
                        {
                            account: 'eosio',
                            // 购买内存的action名
                            name: 'buyrambytes',
                            authorization: [{
                                actor: bankaccount,
                                permission: "active",
                            }],
                            data: {
                                payer: bankaccount,
                                receiver: username,
                                bytes: 1000,
                            },
                        },
                        {
                            account: 'eosio',
                            // 抵押资产的action名，用于租用带宽与cpu,抵押资产,抵押的越多，带宽和cup就越多
                            name: 'delegatebw',
                            authorization: [{
                                actor: bankaccount,
                                permission: 'active',
                            }],
                            data: {
                                from: bankaccount,
                                receiver: username,
                                // 这里的货币单位，要查询一下系统货币的名称才能填，可能是SYS或者EOS
                                stake_net_quantity: '2.0000 EOS',
                                stake_cpu_quantity: '2.0000 EOS',
                                transfer: false,
                            }
                        }]

            }, {
                blocksBehind: 3,
                expireSeconds: 30,
            }).catch(
                result=>{
                    console.log("购买失败"+result);
                }
            ).then(async ()=>{
                console.log("===="+username+"购买成功")
            });
            count++;
            console.log("===="+username+"购买结束")
            //更新
            let query={accountname:username};
            AirUser.findOneAndUpdate(query,
                {net_limit: { used: body.net_limit.used, available:body.net_limit.available, max:body.net_limit.max },
                    cpu_limit: { used: body.cpu_limit.used, available:body.cpu_limit.available, max:body.cpu_limit.max },
                    ram_usage: body.ram_usage},
                {multi: true},()=>{
                    console.log(username+"======"+"购买成功 status success");
                })
}



//调用账户数量
let number=50;

const queryaccount=async ()=>{
    let results= await AirUser.find({});
    for (let i = 0; i <results.length; i++) {
           await setTimeout(async function () {
                count++;
              await   checkAccount(results[i].accountname);
           }, i * 200);
    }
   await setTimeout(queryaccount,10000)
};

 queryaccount()

module.exports={queryaccount,checkAccount,buycpuNet}

