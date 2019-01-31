require("../db/db");
let cryptoUtil=require("../encryption/cryptoUtil");
let companyAccount=require("../model/companyAccount");
let humanAiAccount=require("../model/humanAI");
//let humanAI=require("../model/humanAI");
let accountInfo=require("../eostools/accountInfo");
let key="";
let results="";
let Encryptkey="";

let checkout=async (username)=>{
    return await accountInfo._checkHouseAccount(username);
}

companykey=async (accountname)=>{
    results=await companyAccount.find({});
    for (let i = 0; i < results.length; i++) {
        if (results[i].accountname===accountname){
           key=await cryptoUtil.privateDecrypt(results[i].privatekey);
        }
    }
  return key
};

redblackkey=async(accountname)=>{
    results=await humanAiAccount.find({});
    for (let i = 0; i < results.length; i++) {
        if (results[i].accountname===accountname){
            key=await cryptoUtil.privateDecrypt(results[i].privatekey);
            //console.log(key);
        }
    }
    return key
};
redblackpublickey=async(accountname)=>{
    results=await humanAiAccount.find({});
    for (let i = 0; i < results.length; i++) {
        if (results[i].accountname===accountname){
            key=await results[i].publickey;
            //console.log("================="+key);
        }
    }
    return key
};


myaikey=async (accountname)=>{
    results=await humanAiAccount.find({});
    if (results.length===0)return
    for (let i = 0; i < results.length; i++) {
        if (results[i].accountname===accountname){
            key=await cryptoUtil.privateDecrypt(results[i].privatekey)
            //console.log("=========="+key);
        }
    }
    return key
}

preserveKey=async (newaccountname,privateKey,publicKey)=>{
    console.log("begin");
    try {
        Encryptkey=await cryptoUtil.publicEncrypt(privateKey);//公钥加密
        results=await humanAiAccount.find({});
        for (let i = 0; i < results.length; i++) {
            if (results[i].accountname===accountname){
                return
            }
        }
        let newUser=new companyAccount({
            accountname: newaccountname,
            privatekey: Encryptkey,
            publickey: publicKey,
            net_limit: { used: 0, available: 0, max: 0},
            cpu_limit: { used:0, available: 0, max: 0},
            ram_usage: 0,
            assets: "0.0000 EOS",
            network:"mainnet"
        });
        //与链上一起核实账户信息公钥私钥是否正确
        let resbody=await checkout(newaccountname);
        let chainkey=await resbody.permissions[0].required_auth.keys[0].key;
        console.log(resbody);
        //公寓和账户名一致 则保存
        if (chainkey===publicKey){
            await companyAccount.create(newUser);
            //校验
            let key=await companykey(newaccountname);
           // console.log("=========="+key);
            if (key===privateKey){
                console.log("finish");
            }else {
                console.log("警告！！！！！！！私钥错误，不能保存")
            }
        }
    }catch (e) {
            console.log(JSON.stringify(e.json, null, 2));
    }
};
 module.exports={companykey,myaikey,preserveKey,redblackkey,redblackpublickey};

redblackkey("yiyiranranfc");