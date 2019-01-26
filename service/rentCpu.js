

require('../db/db');
let HumanUser=require("../model/humanAI");//privatekey
const accounts=[];
let cryptoUtil=require('../encryption/cryptoUtil');
let dbutils=require('../utils/dbutils');
let Eoshelper=require('../utils/eoshelper');//需要私钥
let constants=require("../utils/constants");
let result;
let Sleep=require('../utils/sleep');
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
    //获取庄家庄户
    let bankkey=await dbutils.companykey(constants.accountname[1]);
    let position;
    for (let i = 0; i < results.length; i++) {
        // if (results[i].accountname==="dynamitekach"){
        //     console.log("============================="+i);
        //     position=i;
        // }
        // console.log("position",position);
        // if (i === position) {
            if (i>=22){
            //获取账户名和密码
                console.log("转账=========="+results[i].accountname);
            //console.log(results[i]);
            usrname = await results[i].accountname;
            let private_dec_key = await results[i].privatekey;
            let publickey = await results[i].publickey;
            //解密
            let deStr = await cryptoUtil.privateDecrypt(private_dec_key);
           // console.log(usrname + "==========" + deStr + "==========" + publickey);
            //获取transaction
            let usrnamekey = await dbutils.myaikey(usrname);
            let quantity=constants.eos_quancity[2];
            // transaction();
           console.log("usrnamekey=========="+usrnamekey+quantity);
          await Sleep.sleep(1000);
            // await transaction(usrname,usrnamekey,constants.rent_cpu[0],quantity);
            //调用庄家账户转钱
                //转0.2个
           await bank_transaction(bankkey,usrname,usrnamekey,quantity);
            }
    }
}

async function bank_transaction(bankkey,usrname,usrnamekey,quancity) {
    //获取价格
    try {
        result=await Eoshelper.api.myFunc(bankkey).transact({
            actions: [{
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                    actor: constants.accountname[1],
                    permission: 'active',
                }],
                data: {
                    from: constants.accountname[1],
                    to: usrname,
                    quantity: quancity,
                    memo: "pay out",
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
        //handle this deal
    }finally {
        console.log("=========="+JSON.stringify(result));
    }

}


//转账给账户
test=async ()=> {
    await start();
};

test();