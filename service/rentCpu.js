

require('../db/db');
let HumanUser=require("../model/humanAI");//privatekey
const accounts=[];
let cryptoUtil=require('../encryption/cryptoUtil');
let dbutils=require('../utils/dbutils');
let Eoshelper=require('../utils/eoshelper');//需要私钥
let constants=require("../utils/constants");
let result;
getAccounts= async ()=>{
    if (accounts.length === 0){
        let results= await HumanUser.find({});
        return results;
    }else {
        console.log("accounts");
        return accounts;
    }
};
let usrname;

start=async ()=> {
    console.log("airdrop");
    let results = await getAccounts();
    console.log(results.length);
    for (let i = 0; i < results.length; i++) {
        if (i > 12&&i<23) {
            // if (i===12){
            //获取账户名和密码
            // console.log(results[i]);
            usrname = await results[i].accountname;
            let private_dec_key = await results[i].privatekey;
            let publickey = await results[i].publickey;
            //解密
            let deStr = await cryptoUtil.privateDecrypt(private_dec_key);
            console.log(usrname + "==========" + deStr + "==========" + publickey);
            //获取transaction
            let usrnamekey = await dbutils.myaikey(usrname);
            let quantity=constants.eos_quancity[0];
            // transaction();
            console.log("usrnamekey=========="+usrnamekey+quantity);

           await transaction(usrname,usrnamekey,constants.rent_cpu[0],quantity);
        }
    }
}


async function transaction(usrname,usrnamekey, bankaccount,quancity) {
    //获取价格
    try {
         result=await Eoshelper.api.myFunc(usrnamekey).transact({
            actions: [{
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                    actor: usrname,
                    permission: 'active',
                }],
                data: {
                    from: usrname,
                    to: bankaccount,
                    quantity: quancity,
                    memo: "",
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
    }catch (e) {
        console.log(e);
    }finally {
        console.log("=========="+JSON.stringify(result));
    }

}



test=async ()=> {
    await start();
};

test();