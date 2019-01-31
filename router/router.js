let express = require('express');
let router = express.Router();
<<<<<<< HEAD

let HouseAccountRobot = require('../robot/houseAccountRobot');
let HumanaiRobot = require('../robot/humanaiRobot');
require('../db/db');
let HumanAI=require("../model/humanAI");

let arr=[];
//human robot
router.get('/humanRobot',async (req,res)=>{
    await HumanaiRobot.start;
    //开起充值
    res.send("humanRobot_success");
});

//house robot
router.get('/houseaccountRobot',async (req,res)=>{
    await HouseAccountRobot.checkHouseAccount;
    //开起充值
    res.send("houseaccount_success");
});

//str
router.get('/:str',async (req,res)=>{
    const foo = await JSON.parse(req.query.str);
    //开起充值
    res.send(JSON.stringify(foo));
});


//pre all data
router.get('/pre',async (req,res)=>{
    let Internal=require("../db/internal");
    let alldata=HumanAI.find({});
    alldata.forEach((item)=>{
       arr.push(item.accountname);
    });
    Internal.set_humanais(arr);
    res.send("arr[0]:"+arr[0].toString());
});


=======
let Bacarrat_ll = require('../robot/bacarrat/bacarrat_backup_III');


let Internal = require('../db/internal');
let HumanAis = require('../model/humanAI');
let GetInternal = require('../robot/parameterSet/getInternal');

let overtime;

router.get('/baccarat', async (req, res) => {
    console.log("==============================================================");
    //判断超时
    await GetInternal.task();
    overtime = await Internal.get_Internal();
    console.log("===========overtime" + overtime);
    let dbType = await Internal.get_DbType();
    if (overtime === "true") {// A B
        if (dbType === "after") {
            console.log("before");
            let db = await Internal.get_beforeDb();
            let arr1 = await db.split(",");
            await Bacarrat_ll.start(arr1);
            await Internal.set_DbType("before");
        } else if (dbType === "before") {
            console.log("after");
            let data = await Internal.get_afterDb();
            let arr2 = data.split(",");
            await Bacarrat_ll.start(arr2);
            await Internal.set_DbType("after");
        }
        await Internal.set_Internal("false")
    } else if (overtime === 'false') {//1 3 5
        let db=await Internal.get_DbType();
        if (db==="after"){
            console.log("after");
            let data = await Internal.get_afterDb();
            let arr2 = data.split(",");
            await Bacarrat_ll.start(arr2);
            await Internal.set_DbType("after");
        }else if(db==="before"){
            let db = await Internal.get_beforeDb();
            let arr1 = await db.split(",");
            await Bacarrat_ll.start(arr1);
            await Internal.set_DbType("before");
        }
    }
    res.send("baccarat_ok");
});
>>>>>>> d38da3035aaf8501c258928302d18c36b2320fe7
module.exports = router;