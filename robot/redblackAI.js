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
                        quantity: '5.0000 EOS',
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
    return await Math.floor(Math.random()*12);
}
let canceleos = async (username,bankname,privatekey,memo) => {
    console.log(username+"+"+privatekey);
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
                        quantity: '10.0000 EOS',
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


start1=async ()=> {
    //获取投注账户
    // let res=await readdb();
    let res=await HumanAI.find({}).limit(12);

    //查看用户资产
    for (let i = 0; i <res.length ; i++) {
        let assets=await parseInt(res[i].assets);
        let key=await res[i].privatekey;
        let name=await res[i].accountname;
        let myprivatekey=await CryptoUtil.privateDecrypt(key);
        //退还资产
        if (assets>150){
           await canceleos(name,"godapp.e",myprivatekey,constants.sendbackmemo);
        }
        if (assets<20){
            //buyeos = async (bankaccount,username,memo)
            await buyeos("godapp.e",name,constants.buyeosmemo);
        }
    }

    sleep(5000)
    let number = await randANumber();
    //获取下午选手和资产以及 公钥和私钥  游戏状态
     bet(res[number],res[number].accountname,res[number].privatekey);

    sleep(5000)
    let number2 = await randANumber();
      bet(res[number2],res[number2].accountname,res[number2].privatekey);

    let number3 = await randANumber();
      bet(res[number3],res[number3].accountname,res[number3].privatekey);

    sleep(5000)
    let number4 = await randANumber();
     bet(res[number4],res[number4].accountname,res[number4].privatekey);

    sleep(5000)
    let number5 = await randANumber();
     bet(res[number5],res[number5].accountname,res[number5].privatekey);

    sleep(5000)
    let number6 = await randANumber();
    await bet(res[number6],res[number6].accountname,res[number6].privatekey);
    sleep(5000)

    let number7 = await randANumber();
   await bet(res[number7],res[number7].accountname,res[number7].privatekey);

    sleep(5000)
    let number8 = await randANumber();
    await bet(res[number8],res[number8].accountname,res[number8].privatekey);
   //
    sleep(5000)
    let number9 = await randANumber();
    await bet(res[number9],res[number9].accountname,res[number9].privatekey);
   //
    sleep(5000)
    let number10 = await randANumber();
    await bet(res[number10],res[number10].accountname,res[number10].privatekey);

   await setTimeout(start1,0);
}
start1();