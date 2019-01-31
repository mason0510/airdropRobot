let express = require('express');
let router = express.Router();

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


module.exports = router;