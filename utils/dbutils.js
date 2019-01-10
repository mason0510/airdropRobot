//输入名字 返回解密后的私钥


//查询数据库
require("../db/db");
let cryptoUtil=require("../encryption/cryptoUtil");
let companyAccount=require("../model/companyAccount");

mykey=async (accountname)=>{
    let key="";
    let results=await companyAccount.find({});
    if (results.length===0)return
    for (let i = 0; i < results.length; i++) {
        if (results[i].accountname===accountname){
             key=await cryptoUtil.privateDecrypt(results[i].privatekey)
        }
    }
  return key
}
module.exports={mykey}
