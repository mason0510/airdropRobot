//输入名字 返回解密后的私钥


//查询数据库
require("../db/db");
let cryptoUtil=require("../encryption/cryptoUtil");
let companyAccount=require("../model/humanAI");

mykey=async (accountname)=>{
    let key="";
    let results=await companyAccount.find({}).limit(20);
    if (results.length===0)return
    for (let i = 0; i < results.length; i++) {
        // if (results[i].accountname===accountname){
             key=await cryptoUtil.privateDecrypt(results[i].privatekey)
        // console.log("=========="+key);
        // console.log("=========="+results[i].accountname+"======="+key);
        // }
    }
  return key
}
module.exports={mykey}

mykey()