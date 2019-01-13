//获取所有准备的数据
let sleep=require("../utils/sleep");
let eoshelper=require("../utils/eoshelper");
let AccountInfo=require("../utils/accountInfo");
//星球大战
let HumanAI=require("../model/humanAI");
//累计下注额
let betRecoders=require("../model/betRecoders");

let request = require("request");
let CryptoUtil=require('../encryption/cryptoUtil');
let constants=require("../utils/constants");
let Eoshelper=require("../utils/eoshelper");
// let {Buyeos,Rentcpu}=require("../robot/checkCPU");
let dbutils=require("../utils/dbutils");

let Account=require('../eostools/accountInfo');

let randomNumber=require('../utils/randomNumber');
let time=require('../utils/time');
let gameInfo=require('../eostools/tableInfo');

let gamestatus;
let end_time;
let roundId;
let count=0;
//获取前50个账户
let strarr;
let totalAmount=0
let res;
let amount;
let bet=async (randomaccount,accountname,privatekey)=>{
    //随机数123
    await request.post('https://proxy.eosnode.tools/v1/chain/get_table_rows', {
        json: {
            code: 'warofstar.e',
            table:"gametable",
            scope:"warofstar.e",
            json:true
        }
    }, async (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        // console.log(`statusCode: ${res.statusCode}`)
        gamestatus =await body.rows[0].status;
        end_time=await body.rows[0].end_time;
        roundId=await body.rows[0].id;
        console.log(gamestatus+"=============================================="+roundId)
        if(gamestatus===2){
            let money=await constants.betnumber[Math.floor(Math.random()*constants.betnumber.length)]
            let area=await constants.betarea[Math.floor(Math.random()*constants.betarea.length)]
            let memo=roundId+","+accountname+","+area+","+money+",";
            let quantity=await constants.arr[Math.floor(Math.random()*constants.arr.length)]

            await _bet(accountname,privatekey,quantity,memo);
        }
    })

}


//开始投注
_bet=async (account,privatekey,quantity,memo)=>{
    if(!account&&!privatekey&&!memo){
        return false
    }
    count++;
    console.log("playing 进行中",account+"=========="+memo);
    //对私钥进行解密
    let mykey=CryptoUtil.privateDecrypt(privatekey);
    // console.log(account+"===================="+mykey);
    try {
        await eoshelper.api.myFunc(mykey).transact({
            actions: [{
                account: "eosio.token",
                name: 'transfer',
                authorization: [{
                    actor: account,
                    permission: 'active',
                }],
                data: {
                    from: account,
                    to: "warofstar.e",
                    quantity:quantity,
                    memo: memo,
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        })

        console.log(account+"当前第"+count+"次下注"+"finish");
            strarr=quantity.split(" ")
            totalAmount+=await parseFloat(arr[0])
        console.log("累计下注额===================="+totalAmount)
    }catch (e) {
        console.log(JSON.stringify(e))
    }
    return true;
}


let buyeos = async (bankaccount,username,memo) => {
    let mykey = await dbutils.companykey("godapp.e")
    // console.log("===================="+mykey);
    console.log(bankaccount+"===="+username+"======="+memo);
   try {
       let result=await Eoshelper.api.myFunc(mykey).transact({
           actions:
               [
                   {
                       account: 'eosio.token',
                       // 抵押资产的action名，用于租用带宽与cpu,抵押资产,抵押的越多，带宽和cup就越多
                       name: 'transfer',
                       authorization: [{
                           actor: "godapp.e",
                           permission: 'active',
                       }],
                       data: {
                           from: 'godapp.e',
                           to: username,
                           quantity: '2.5000 EOS',
                           memo: memo,
                       }
                   }]

       }, {
           blocksBehind: 3,
           expireSeconds: 30,
       }).then(()=>{
           count++;
           console.log("====" + username + "购买eos结束")
       })
   }catch (e) {
       console.log(JSON.stringify(e))
   }
}


sleep=async (ms)=>{
    return new Promise(resolve=>setTimeout(resolve,ms))
}


let reimbursement = async (gameaccount,bankname,key,memo,amount) => {
    try {
    await Eoshelper.api.myFunc(key).transact({
        actions:
            [
                {
                    account: 'eosio.token',
                    name: 'transfer',
                    authorization: [{
                        actor: gameaccount,
                        permission: 'active',
                    }],
                    data: {
                        from: gameaccount,
                        to: bankname,
                        quantity: amount,
                        memo: memo,
                    }
                }]

    }, {
        blocksBehind: 3,
        expireSeconds: 30,
    },function err(err) {
        console.log(err);
    })
    count++;
    console.log(gameaccount + "退还eos");
    }
    catch (e) {
        console.log("err"+e);
    }
}



//租赁cpu scope contract table

checkAccount=async(username,myprivatekey)=>{

    let options = { method: 'POST',
        url: 'https://proxy.eosnode.tools/v1/chain/get_account',
        body: { account_name: username },
        json: true };

    await request(options, async function (error, response, body) {
        if (error) {
            return
        }
        let zz=await parseInt(body.core_liquid_balance);
            //获取
            if (zz-20>0&&zz-40<0){
              await buyeos("godapp.e",username,constants.buyeosmemo);
            }
            if (zz-40>0){
                amount=String(zz-40)+".0000 EOS"
               await reimbursement(username,"godapp.e",myprivatekey,constants.sendbackmemo,amount);
            }
    });
}
checkHouseAccount=async()=>{
    let options = { method: 'POST',
        url: 'https://proxy.eosnode.tools/v1/chain/get_account',
        body: { account_name: "houseaccount" },
        json: true };

    await request(options, async function (error, response, body) {
        if (error) {
            return
        }
        let zz=await parseInt(body.core_liquid_balance,0);
        console.log("houseaccount"+"========================================"+body.core_liquid_balance);
            if (zz-1000>0){
                amount=String(zz-1000)+".0000 EOS";
                let mykey=await dbutils.companykey("houseaccount");
                console.log(mykey+amount);
              await reimbursement("houseaccount","godapp.e",mykey,amount,constants.sendbackmemo)
            }
    });
}


start1=async ()=> {

    //获取合约开始时间

    let res=await HumanAI.find({}).limit(11);

    for (let i = 0; i <res.length ; i++) {
        let key=await res[i].privatekey;
        let name=await res[i].accountname;
        let myprivatekey=await CryptoUtil.privateDecrypt(key);
        await checkAccount(name,myprivatekey);
    }

    await checkHouseAccount();

    let resnumber = await randomNumber.norepeatNumber(3);
    //获取下午选手和资产以及 公钥和私钥  游戏状态

     await bet(res[resnumber[0]],res[resnumber[0]].accountname,res[resnumber[0]].privatekey);

    await sleep(1000)

    await bet(res[resnumber[1]],res[resnumber[1]].accountname,res[resnumber[1]].privatekey);
   await sleep(1000)

    await bet(res[resnumber[2]],res[resnumber[2]].accountname,res[resnumber[3]].privatekey);

    await sleep(1000)

    await bet(res[resnumber[3]],res[resnumber[3]].accountname,res[resnumber[3]].privatekey);

    await sleep(1000)

    await bet(res[resnumber[4]],res[resnumber[4]].accountname,res[resnumber[4]].privatekey);

    await setTimeout(start1,15000);
}
//整个入口
//检查或退还余额 下注 存库
start1();
