let HumanAI=require('../model/humanAI');
let constants=require('../utils/constants');
let CryptoUtil=require("../encryption/CryptoUtil")
let aa=require("../utils/dbutils");

let my=async()=>{
  let key=await CryptoUtil.privateDecrypt("ilYMp2x8MbyBvQr6hjBPt7Df5kpEgqSqKgOJhNc6IqT/Kt+RDWRztOOnbQPeRfy0aST3C1O+C3EyHADmYdIbv3ZO53ZIBJTTZ+OGoKoW4YsZS+JYlb4R7i06nKHPYJf88dlbMpeV65Vj6/f3X/loht4yg9gvWGvP6KUlN+MpWaA=");
    console.log("=========="+key.length)
};
my()
let canceleos = async (username,bankname,privatekey,memo) => {
    console.log(username+"+"+privatekey);
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
                        quantity: '5.0000 EOS',
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
    console.log(username + "退还eos"+"5.0000 EOS");
}


let test=async ()=>{
    let res=await HumanAI.find({}).limit(20);
    console.log(res);
    //查看用户资产
    for (let i = 0; i <res.length ; i++) {
        let assets=await parseInt(res[i].assets);
        console.log("=========="+assets);
        //退还资产
        if (assets>10){
            let key=await res[i].privatekey;
            let name=await res[i].accountname;
            let myprivatekey=await CryptoUtil.privateDecrypt(key);
            await canceleos(name,"godapp.e",myprivatekey,constants.sendbackmemo);
        }
    }
}

// robot();