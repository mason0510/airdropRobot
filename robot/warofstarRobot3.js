//星球大战
let sleep=require("../utils/sleep");
let eoshelper=require("../utils/eoshelper");
let AccountInfo=require("../utils/accountInfo");
let EosAccount50=require("../model/godappusr1/eosusr(0-50)");
let EosAccount=require("../model/eosAccount");
let request = require("request");
let Time=require("../utils/time");
let gamestatus;
let end_time;
let roundId;/Volumes/微信 WeChat
let count=0;
//获取前50个账户
const writedb=async ()=>{
    const results = await EosAccount.find({});
    results.forEach(async (item,index) => {
        if(index<=49){
            //may not be in mongodb 账户名 资产 创建时间
            let res = EosAccount50.find({assets: item.assets}).limit(1);
            if (!res){
                let user1 = new EosAccount50({
                    accountname: item.accountname,
                    privatekey: item.privatekey,
                    publickey: item.publickey,
                    net_limit: { used: item.net_limit.used, available: item.net_limit.available,max:item.net_limit.max  },
                    cpu_limit: { used:item.cpu_limit.used , available: item.cpu_limit.available, max:item.cpu_limit.max},
                    ram_usage: item.ram_usage,
                    created:item.created
                });
                console.log(user1)
                await EosAccount50.create(user1);
            }
        }
    })
    console.log("finish");
};


//开始投注
_bet=async (account,privatekey,quantity,memo)=>{
    if(!account&&!privatekey&&!memo){
        return false
    }
    count++;
    console.log("beting 进行中",account+"=========="+memo);
    try {
        await eoshelper.api.myFunc(privatekey).transact({
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
        return false;
    }catch (e) {
        console.log("error======"+e);
        return false;
    }
    return true;
}




readdb=async ()=>{
    return  await EosAccount50.find({});
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
    return await Math.floor(Math.random()*50);
}

start=async ()=> {
    //获取投注账户
    const results=await readdb();
    let randomaccount=await Math.floor(Math.random()*50);
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
// let betnumber=[5000,10000,50000];
let betnumber=[50000];
// let arr=["0.5000 EOS","1.0000 EOS","5.0000 EOS","10.0000 EOS"];
let arr=["5.0000 EOS"];
let bet=async (betassets,randomaccount,accountname,privatekey)=>{
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
        console.log(gamestatus+"======"+roundId)

        if(gamestatus===2){
            let money=await betnumber[Math.floor(Math.random()*betnumber.length)]
            let area=await betarea[Math.floor(Math.random()*betarea.length)]
            let memo=roundId+","+accountname+","+area+","+money+",";
            let quantity=await arr[Math.floor(Math.random()*arr.length)]
            console.log(accountname+"===================="+memo);
            await _bet(accountname,privatekey,quantity,memo);

        }


    })

}



start=async ()=> {
    //获取投注账户
    const results=await readdb();
    if (results.length===0){
        return
    }
    let number=await randANumber();
    let betassets=await parseInt(results[number].assets);
    //判断游戏是否在进行中
    console.log("=========="+number);
    console.log("=========="+betassets);
    //获取下午选手和资产以及 公钥和私钥  游戏状态
    await bet(betassets,results[number],results[number].accountname,results[number].privatekey);

    setTimeout(start,10000);
}

start();
// _bet("godapp.e","","0.5000 EOS","2461,zhangaccount,2,5000,");