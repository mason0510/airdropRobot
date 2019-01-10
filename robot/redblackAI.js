//获取所有准备的数据
let sleep=require("../utils/sleep");
let eoshelper=require("../utils/eoshelper");
let AccountInfo=require("../utils/accountInfo");
//星球大战
let HumanAI=require("../model/humanAI");
let request = require("request");
let CryptoUtil=require('../encryption/cryptoUtil');

let gamestatus;
let end_time;
let roundId;
let count=0;
//获取前50个账户
let strarr;
let totalAmount=0

//开始投注
_bet=async (account,privatekey,quantity,memo)=>{
    if(!account&&!privatekey&&!memo){
        return false
    }
    count++;
    console.log("playing 进行中",account+"=========="+memo);
    //对私钥进行解密
    let mykey=CryptoUtil.privateDecrypt(privatekey);
    console.log("===================="+mykey);
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




readdb=async ()=>{
    //获取资产最多的二十个人
    let results=await HumanAI.find({}).limit(20)
    return  results;

};


betresult=()=>{

}


sleep=async (ms)=>{
    return new Promise(resolve=>setTimeout(resolve,ms))
}

//获取当前的轮次
getGameStatus=async ()=>{
    console.log("==============");
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
    return await Math.floor(Math.random()*20);
}

start=async ()=> {
    //获取投注账户
    const results=await readdb();
    let randomaccount=await Math.floor(Math.random()*20);
    //随机投注的次数 每隔一段时间 取一次随机数 资产少 投的多 资产多投的多
    //console.log(results[randomaccount]);
    let betassets=await parseInt(results[randomaccount].assets);
    if (betassets!==0){
        await bet(betassets,results[randomaccount],results[randomaccount].accountname,results[randomaccount].privatekey);
    }else {
        return
    }
}
let betarea=["1","2","4"];
let betnumber=[5000,10000,50000,100000];
let arr=["0.5000 EOS","1.0000 EOS","5.0000 EOS","10.0000 EOS"];
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
        console.log(`statusCode: ${res.statusCode}`)
        gamestatus =await body.rows[0].status;
        end_time=await body.rows[0].end_time;
        roundId=await body.rows[0].id;
        console.log(gamestatus+"=============================="+roundId)

        if(gamestatus===2){
            let money=await betnumber[Math.floor(Math.random()*betnumber.length)]
            let area=await betarea[Math.floor(Math.random()*betarea.length)]
            let memo=roundId+","+accountname+","+area+","+money+",";
            let quantity=await arr[Math.floor(Math.random()*arr.length)]
            //  console.log(accountname+"===================="+memo);
            await _bet(accountname,privatekey,quantity,memo);
        }


    })

}
let res;

async function getrandomSeed() {

    let betassets = await parseInt(res[number].assets);
    return {number, betassets};
}

start=async ()=> {
    //获取投注账户
    res=await readdb();

    let number = await randANumber();
    //获取下午选手和资产以及 公钥和私钥  游戏状态
    bet(res[number],res[number].accountname,res[number].privatekey);


    let number2 = await randANumber();
     bet(res[number2],res[number2].accountname,res[number2].privatekey);


    let number3 = await randANumber();
     bet(res[number3],res[number3].accountname,res[number3].privatekey);


    let number4 = await randANumber();
    bet(res[number4],res[number4].accountname,res[number4].privatekey);


    let number5 = await randANumber();
    bet(res[number5],res[number5].accountname,res[number5].privatekey);


    let number6 = await randANumber();
    bet(res[number6],res[number6].accountname,res[number6].privatekey);


    let number7 = await randANumber();
    bet(res[number7],res[number7].accountname,res[number7].privatekey);


    let number8 = await randANumber();
    bet(res[number8],res[number8].accountname,res[number8].privatekey);


    let number9 = await randANumber();
    bet(res[number9],res[number9].accountname,res[number9].privatekey);


    let number10 = await randANumber();
    bet(res[number10],res[number10].accountname,res[number10].privatekey);

   await setTimeout(start,3000);
}
start();