//获取所有准备的数据
let sleep=require("../utils/sleep");
let eoshelper=require("../utils/eoshelper");
let AccountInfo=require("../utils/accountInfo");
//星球大战
let humanais=require("../model/humanAI");
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
let tableInfo=require('../eostools/tableInfo');

let gamestatus;
let end_time;
let roundId;
let count=0;
//获取前50个账户
let strarr;
let totalAmount=0
let res;
let amount;
//开始投注
_bet=async (account,privatekey,quantity,memo,betarea,roundId)=>{
    //判断下注数字 如果随机出一样的 不再下注
    try {
      let playerInfos=  await tableInfo.getPlayerTable();
        for (let i = 0; i <playerInfos.length ; i++) {
          let player=  playerInfos.rows[i].player;
          let game_id=  playerInfos.rows[i].game_id;
          let bet_type=  playerInfos.rows[i].bet_type;
          if((player===account)&&(bet_type=parseInt(betarea))&&game_id===roundId){
              return;
          }
        }

    count++;
    console.log("playing 进行中",account+"=========="+memo);
    //对私钥进行解密
    let mykey=CryptoUtil.privateDecrypt(privatekey);
    // console.log(account+"===================="+mykey);

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

        console.log("当前第"+count+"次下注"+"finish");
        arr=quantity.split(" ")
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
        console.log(JSON.stringify("下注失败"+e))
        //清表

    }
}


sleep=async (ms)=>{
    return new Promise(resolve=>setTimeout(resolve,ms))
}


let reimbursement = async (gameaccount,bankname,key,amount,memo) => {
    //console.log(gameaccount+"=="+bankname+"=="+key+"==="+amount+"=="+memo);
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

        console.log(gameaccount + "退还eos"+amount);
    }
    catch (e) {
        console.log("err"+e);
    }
}



//租赁cpu scope contract table

checkAccount=async(username,myprivatekey)=>{
  //  console.log(username+"==="+myprivatekey)

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
        if (zz-40<0){
            await buyeos("godapp.e",username,constants.buyeosmemo);
        }
        if (zz-60>0) {
            amount = String(zz - 40) + ".0000 EOS"
                await reimbursement(username, "godapp.e", myprivatekey, amount, constants.sendbackmemo);

        }
        else {
            return
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
        let zz=await parseInt(body.core_liquid_balance);
        console.log("houseaccount"+"========================================"+body.core_liquid_balance);
        if (zz-1500>0){
            amount=String(zz-1500)+".0000 EOS";
            let mykey=await dbutils.companykey("houseaccount");
            await reimbursement("houseaccount","godapp.e",mykey,amount,constants.sendbackmemo)
        }else {
            return;
        }
    });
}


start=async ()=> {
    //获取游戏状态
    let gameTable=await tableInfo.getGameTable();

    console.log("==================新的开始状态"+gameTable.rows[0].id+"======"+gameTable.rows[0].status);
    let status=gameTable.rows[0].status;
    let largest_winner=gameTable.rows[0].status;
    let roundId=gameTable.rows[0].id;

    let res=await humanais.find({}).limit(11);
   // console.log("=================="+res)
    for (let i = 0; i <res.length ; i++) {
        let key=await res[i].privatekey;
        let name=await res[i].accountname;
        let myprivatekey=await CryptoUtil.privateDecrypt(key);
        setTimeout(async()=>{
            await checkAccount(name,myprivatekey);
        },i*200)
    }
    await sleep(500);
    await checkHouseAccount();

    let resnumber = await randomNumber.norepeatNumber(5).catch(()=>{
        console.log("error")
    });
    let accountname0=res[resnumber[0]].accountname;
    let privatekey0=res[resnumber[0]].privatekey;
    let accountname1=res[resnumber[1]].accountname;
    let privatekey1=res[resnumber[1]].privatekey;
    let accountname2=res[resnumber[2]].accountname;
    let privatekey2=res[resnumber[2]].privatekey;
    let accountname3=res[resnumber[3]].accountname;
    let privatekey3=res[resnumber[3]].privatekey;
    let accountname4=res[resnumber[4]].accountname;
    let privatekey4=res[resnumber[4]].privatekey;

    if (status===2) {
        //获取下午选手和资产以及 公钥和私钥  游戏状态
        let area0 = await constants.betarea[Math.floor(Math.random() * constants.betarea.length)]
        let memo0 = roundId + "," + res[resnumber[0]].accountname + "," + area0 + "," + 5000 + ",";
        await _bet(accountname0, privatekey0, "0.5000 EOS", memo0,area0,roundId).catch((error)=>{
            console.log(error)
        });

        await sleep(2000);
        let area1 = await constants.betarea[Math.floor(Math.random() * constants.betarea.length)]
        let memo1 = roundId + "," + res[resnumber[1]].accountname + "," + area1 + "," + 10000 + ",";
        await _bet(accountname1, privatekey1, "1.0000 EOS", memo1,area1,roundId).catch((error)=>{
            console.log(error)
        });

        await sleep(2000);
        let area2 = await constants.betarea[Math.floor(Math.random() * constants.betarea.length)]
        let memo2 = roundId + "," +  res[resnumber[2]].accountname + "," + area2 + "," + 10000 + ",";
         await _bet(accountname2,  privatekey2, "1.0000 EOS", memo2,area2,roundId).catch((error)=>{
             console.log(error)
         });

        await sleep(2000);
        let area3 = await constants.betarea[Math.floor(Math.random() * constants.betarea.length)]
        let memo3 = roundId + "," + res[resnumber[3]].accountname + "," + area3 + "," + 50000 + ",";
        await _bet(accountname3, privatekey3, "5.0000 EOS", memo3,area3,roundId).catch((error)=>{
            console.log(error)
        });

        await sleep(2000);
        let area4 = await constants.betarea[Math.floor(Math.random() * constants.betarea.length)]
        let memo4 = roundId + "," + res[resnumber[4]].accountname + "," + area4 + "," + 5000 + ",";
         await _bet(res[resnumber[4]].accountname, res[resnumber[4]].privatekey, "0.5000 EOS", memo4,area4,roundId).catch((error)=>{
             console.log(error)
         });
    }
     setTimeout(start,2000);
};

start();