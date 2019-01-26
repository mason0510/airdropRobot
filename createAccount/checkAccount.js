let robotAccountConstants = require("../utils/robotAccountConstants");
//从数据库获取账户
/**
 * 连接
 * 获取数据库表名
 * 查找对比
 * 列出索引
 */
require("../db/db");
let HumanAI = require('../model/humanAI');
// let BanchAccount = require('./banchAccount');
let ecc = require("eosjs-ecc")
let cryptoUtil = require("../encryption/cryptoUtil");

var fs= require("fs");
//保证数组不重复
let distinct = async () => {
    //数组本身是否重复的
    let humanais = await HumanAI.find({});
    //从数组中取值
    let arr1 = robotAccountConstants.arr1;
    let arr2 = robotAccountConstants.arr2;
    let arr3 = robotAccountConstants.arr3;
    let arr4 = robotAccountConstants.arr4;
    let arr5 = robotAccountConstants.arr5;
    let arr6 = robotAccountConstants.arr6;
    let arr7 = robotAccountConstants.arr7;
    let arr8 = robotAccountConstants.arr8;
    let arr9 = robotAccountConstants.arr9;
    let arr10 = robotAccountConstants.arr10;
    let arr11 = robotAccountConstants.arr11;
    let arr12 = robotAccountConstants.arr12;
    let arr13 = robotAccountConstants.arr13;
    let arr14 = robotAccountConstants.arr14;
    let arr15 = robotAccountConstants.arr15;
    let arr16 = robotAccountConstants.arr16;
    let arr17 = robotAccountConstants.arr17;
    let arr18 = robotAccountConstants.arr18;
    let arr19 = robotAccountConstants.arr19;
    let arr20 = robotAccountConstants.arr20;
    let arr21 = robotAccountConstants.arr21;
    let arr22 = robotAccountConstants.arr22;
    let arr23 = robotAccountConstants.arr23;
    let arr24 = robotAccountConstants.arr24;
    // console.log(arr4);


    //查看是否相互包含
    let set1 = Array.from(new Set([1, 1, 2, 2, 33, '33', 44, '44'
    ]));
    let set2 =await Array.from(new Set([...arr24,...arr23,...arr22,...arr21,...arr20,...arr19,...arr18,...arr17,...arr1,...arr2,...arr3,...arr4, ...arr5, ...arr6, ...arr7, ...arr8, ...arr9, ...arr10, ...arr11, ...arr12, ...arr13, ...arr14, ...arr15, ...arr16,
    ]));
    console.log("set2", set2.length);
    // console.log(set2);
    // fs.appendFile('/Users/michael_zhang/WebstormProjects/untitled1/airdrop/createAccount/robot', set2, function (err) {
    //     if (err) throw err;
    //
    //     //数据被添加到文件的尾部
    //     console.log('The "data to append" was appended to file!');
    // });

    // for (let i = 0; i < humanais.length; i++) {
    //     let res = set2.indexOf(humanais[i].accountname);
    //     //console.log("res:",res);
    //     if (!res === -1) {
    //         console.log("包含" + i);
    //         return res
    //     }
    // }
    //全部数据生成私钥保存
    //保存在数据库
    // for (let i = 0; i < set2.length; i++) {
    //     //构建集合 baocunzaishujuk
    //     //创建私钥 加密
    //          let privateKey=await ecc.randomKey();
    //
    //         let publicKey = await ecc.privateToPublic(privateKey);
    //         //加密私钥
    //         let encryptprivateKey = await cryptoUtil.publicEncrypt(privateKey);
    //         //再次检查
    //
    //             console.log(publicKey + "=========="  + "=========" + set2[i]);
    //                 let item = new HumanAI({
    //                     accountname: set2[i],
    //                     privatekey: encryptprivateKey,
    //                     publickey: publicKey,
    //                     net_limit: {used: 0, available: 0, max: 0},
    //                     cpu_limit: {used: 0, available: 0, max: 0},
    //                     ram_usage: 0,
    //                     assets: "0.0000 EOS",
    //                     network: 2000,
    //                     active: false,
    //                 });
    //                 //保存
    //         await HumanAI.create(item);
    //         console.log(set2[i]+"保存成功"+item);
    //          let priKey = await cryptoUtil.privateDecrypt(encryptprivateKey);//私钥解密
    //         //解密
    //     console.log(set2[i]+"publickey========="+publicKey+"prikey解密========="+priKey);
    // }
    }
distinct();

