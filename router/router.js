let express = require('express');
let RedBlue = require('../robot/redblack/redBlack');
let router = express.Router();
let robotAccountConstants = require('../utils/robotAccountConstants');
let Bacarrat = require('../robot/bacarrat/bacarrat');
let Bacarrat_internal = require('../robot/bacarrat/bacarrat_llI');


let Bacarrat_ll = require('../robot/bacarrat/bacarrat_llI');


let Iemainder_redis = require('../utils/remainder_redis');


let robotConstants = require('../utils/robotAccountConstants');

let Timeout = require("../router/devidedb");

let Internal = require('../db/internal');
let HumanAis = require('../model/humanAI');
let GetInternal = require('../robot/parameterSet/getInternal');

// let robot;
let predata;
let db1 = [];
let db2 = [];
let overtime;
router.get('/baccarat_ll', async (req, res) => {
    console.log("==============================================================");
    //判断超时
    // let overtime= await Internal.get_Internal();
    //  if (overtime==="true"){
    //      //或者根据时间
    //      let time=await Internal.get_Iime();
    //      if (time%2===0){
    //          let db=await Internal.get_beforeDb();
    //          let arr1= await db.split(",");
    //          await Bacarrat_ll.start(arr1);
    //      } else {
    //          let db=await Internal.get_afterDb();
    //          let arr2=await db.split(",");
    //          await Bacarrat_ll.start(arr2);
    //      }
    //      //超过一小时 增大1 会导致下次结果变化
    //      await Internal.set_Internal(false)
    //  } else if (overtime==='false') {//1 3 5
    //      let data=await Internal.get_afterDb();
    //      let arr2=data.split(",");
    //      await Bacarrat_ll.start(arr2);
    //      // await Bacarrat_ll.start();
    //      console.log("后一半数据库");
    //  }
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
module.exports = router;