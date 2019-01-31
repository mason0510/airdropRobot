let express = require('express');
let RedBlue = require('../robot/redblack/redBlack');
let router = express.Router();
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
module.exports = router;