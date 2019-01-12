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
let gamestatus;
let end_time;
let roundId;
let count=0;
//获取前50个账户
let strarr;
let totalAmount=0
let res;
let amount
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
        return false;
    }catch (e) {
        return false;
    }
    return true;
}


let buyeos = async (bankaccount,username,memo) => {
    let mykey = await dbutils.mykey("godapp.e")
    // console.log("===================="+mykey);
    console.log(bankaccount+"===="+username+"======="+memo);
    let result=await Eoshelper.api.myFunc("5JgWbqPFygNyurb888NcjpLAtZEyW5cLvMDQ8586EhisrCusxBD").transact({
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
    console.log(result);

}


sleep=async (ms)=>{
    return new Promise(resolve=>setTimeout(resolve,ms))
}

//获取当前的轮次
getGameStatus=async ()=>{
    // console.log("==============");
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
        console.log(`statusCode: ${res.statusCode}`)
        gamestatus =await body.rows[0].status;
        end_time=await body.rows[0].end_time;
        roundId=await body.rows[0].id;
        // console.log(gamestatus+"======"+roundId)
        return gamestatus
    }).then((status)=>{

    })
}

let randANumber=async ()=>{
    return await Math.floor(Math.random()*11);
}
let canceleos = async (username,bankname,privatekey,memo,amount) => {
    console.log(username+"+"+privatekey+"=========="+amount);
    try {
    await Eoshelper.api.myFunc(privatekey).transact({
        actions:
            [
                {
                    account: 'eosio.token',
                    name: 'transfer',
                    authorization: [{
                        actor: username,
                        permission: 'active',
                    }],
                    data: {
                        from: username,
                        to: 'godapp.e',
                        quantity: amount,
                        memo: memo,
                    }
                }]

    }, {
        blocksBehind: 3,
        expireSeconds: 30,
    },function (err) {
        console.log(err);
    })
    count++;
    console.log(username + "退还eos");
    }
    catch (e) {
        console.log("err"+e);
    }
}
let cancelhouseeos = async (username,bankname,memo,amount) => {
    console.log(username+"+"+"=========="+amount);
   // let mykey=await CryptoUtil.privateDecrypt("houseaccount");
    console.log(username+"+"+"=========="+amount);
    try {
        let aa="5J5Vxn8xNNSmv5tue1HSkB9NHAFPSLxyghQJEjWWuFf44EtpfAA"
        await Eoshelper.api.myFunc(aa).transact({
            actions:
                [
                    {
                        account: 'eosio.token',
                        name: 'transfer',
                        authorization: [{
                            actor: username,
                            permission: 'active',
                        }],
                        data: {
                            from: username,
                            to: bankname,
                            quantity: amount,
                            memo: memo,
                        }
                    }]

        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        },function (err) {
            console.log(err);
        })
        count++;
        console.log(username + "退还eos");
    }
    catch (e) {
        console.log("err"+e);
    }
}


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
        console.log(gamestatus+"========================================="+roundId)
        if(gamestatus===2){
            let money=await constants.betnumber[Math.floor(Math.random()*constants.betnumber.length)]
            let area=await constants.betarea[Math.floor(Math.random()*constants.betarea.length)]
            let memo=roundId+","+accountname+","+area+","+money+",";
            let quantity=await constants.arr[Math.floor(Math.random()*constants.arr.length)]
            //  console.log(accountname+"===================="+memo);
            await _bet(accountname,privatekey,quantity,memo);
        }
    })

}

//租赁cpu scope contract table
let rentcpu=(username,privatekey)=>{
    let request = require("request");
    let options = { method: 'POST',
        url: 'https://proxy.eosnode.tools/v1/chain/get_table_rows',
        body: { scope: "bankofstaked",code:"bankofstaked",table:"plan",json:true },
        json: true };

    request(options, async function (error, response, body) {
        if (error) {
            return
        }
        //0.2 eos 租赁7天 每一个
        // console.log("price=========================================="+body.rows[5].price);
        _rentcpu(body.rows[5].price,username,username,privatekey);
    });

}

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
        console.log(username+"========================================"+body.core_liquid_balance);
        console.log(username+"==================="+parseInt(zz))
            //获取
            if (zz-10>0&&zz-20<0){
            console.log("buy")
              await buyeos("godapp.e",username,constants.buyeosmemo);
            }
            if (zz-50>0){
            console.log("cancel")
                amount=String(zz-50)+".0000 EOS"
               await canceleos(username,"godapp.e",myprivatekey,constants.sendbackmemo,amount);
            }
    });
}
checkHouseAccount=async(username)=>{
    let options = { method: 'POST',
        url: 'https://proxy.eosnode.tools/v1/chain/get_account',
        body: { account_name: username },
        json: true };

    await request(options, async function (error, response, body) {
        if (error) {
            return
        }
        let zz=await parseInt(body.core_liquid_balance);
        console.log(username+"========================================"+body.core_liquid_balance);
        console.log(username+"==================="+parseInt(zz))
            if (zz-1000>0){
                amount=String(zz-1000)+".0000 EOS"
              await cancelhouseeos("houseaccount","godapp.e"," return ",amount)
            }
    });
}


start1=async ()=> {
    //获取投注账户
    // let res=await readdb();
    let res=await HumanAI.find({}).limit(11);

    //查看用户资产
    for (let i = 0; i <res.length ; i++) {
        let key=await res[i].privatekey;
        let name=await res[i].accountname;
        let myprivatekey=await CryptoUtil.privateDecrypt(key);
        await checkAccount(name,myprivatekey);
    }

    await checkHouseAccount("houseaccount");



    let number = await randANumber();
    //获取下午选手和资产以及 公钥和私钥  游戏状态
     await bet(res[number],res[number].accountname,res[number].privatekey);

    sleep(2000)
    let number2 = await randANumber();
    await bet(res[number2],res[number2].accountname,res[number2].privatekey);
    sleep(2000)
    let number3 = await randANumber();
    await bet(res[number3],res[number3].accountname,res[number3].privatekey);

    sleep(2000)
    let number4 = await randANumber();
    await bet(res[number4],res[number4].accountname,res[number4].privatekey);

    sleep(2000)
    let number5 = await randANumber();
    await bet(res[number5],res[number5].accountname,res[number5].privatekey);

   //  sleep(5000)
   //  let number6 = await randANumber();
   //  await bet(res[number6],res[number6].accountname,res[number6].privatekey);
   //  sleep(5000)
   //
   //  let number7 = await randANumber();
   // await bet(res[number7],res[number7].accountname,res[number7].privatekey);
   //
   //  sleep(5000)
   //  let number8 = await randANumber();
   //  await bet(res[number8],res[number8].accountname,res[number8].privatekey);
   // //
   //  sleep(5000)
   //  let number9 = await randANumber();
   //  await bet(res[number9],res[number9].accountname,res[number9].privatekey);
   // //
   //  sleep(5000)
   //  let number10 = await randANumber();
   //  await bet(res[number10],res[number10].accountname,res[number10].privatekey);

   await setTimeout(start1,15000);
}
start1();