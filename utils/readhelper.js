require("../db/db");
let fs = require('fs');
let readline = require('readline');
let HumanAI=require("../model/humanAI");
let ecc=require("eosjs-ecc")
let cryptoUtil=require("../encryption/cryptoUtil");
let EccUtils=require("./eccUtils");
let Sleep=require("./sleep");
function readFileToArr(fReadName,callback){
    var fRead = fs.createReadStream(fReadName);
    var objReadline = readline.createInterface({
        input:fRead
    });
    var arr = new Array();
    objReadline.on('line',function (line) {
        arr.push(line);
        //console.log('line:'+ line);
    });
    objReadline.on('close',function () {
        // console.log(arr);
        callback(arr);
    });
}



save=async (username)=>{
    //生成一组公私钥
    let pravitekey=await ecc.randomKey();
    let publicKey = await ecc.privateToPublic(pravitekey);
    //私钥加密
    let pravitekeystr = await cryptoUtil.publicEncrypt(pravitekey);//对私钥进行加密
    await savedb(username,pravitekeystr,publicKey);
    console.log(username+"====="+publicKey+"====="+pravitekeystr);
}
async function savedb(username,pravitekeystr,publicKey) {
    let humanAI = new HumanAI({
        accountname: username,
        privatekey: pravitekeystr,
        publickey: publicKey,
        net_limit: {
            used: 0,
            available: 0,
            max: 0
        },
        cpu_limit: {
            used: 0,
            available: 0,
            max: 0
        },
        ram_usage: 0,
        assets: "0.0000 EOS",
        network:"MainNet",
        active:false,
    });
    await HumanAI.create(humanAI).catch(errmsg => {
        console.log("error" + errmsg)
    });
}

//获取数据
readFileToArr("./accountlist",async (data)=>{
    for (let i = 0; i <data.length; i++) {
        if (i%2===0) {
            //获取数据库
          await  save(data[i]);
        }
    }
})