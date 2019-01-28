let express=require('express');
let RedBlue=require('../robot/redblack/redBlack');
let router=express.Router();
let robotAccountConstants=require('../utils/robotAccountConstants');
let Bacarrat= require('../robot/bacarrat/bacarrat');
let Bacarrat_internal= require('../robot/bacarrat/bacarrat_llI');


let Bacarrat_ll= require('../robot/bacarrat/bacarrat_llI');



let Iemainder_redis=require('../utils/remainder_redis');



let robotConstants=require('../utils/robotAccountConstants');

let Timeout=require("../router/devidedb");

let Internal=require('../db/internal');
let HumanAis=require('../model/humanAI');

// let robot;
let predata;
let db1=[];
let db2=[];
router.get('/baccarat_ll',async (req,res)=>{
    console.log("==============================================================");
    //判断超时
   let overtime= Timeout.timeout();

    if (overtime===true){
        let j=await Internal.get_count();
        if (parseInt(j)%2===0){
            let db=await Internal.get_beforeDb();
            let arr1= await db.split(",");
            await Bacarrat_ll.start(arr1);
        } else {
            let db=await Internal.get_afterDb();
            let arr2=await db.split(",");
            await Bacarrat_ll.start(arr2);
        }
    } else {//1 3 5
        let data=await Internal.get_afterDb();
        let arr2=data.split(",");
        await Bacarrat_ll.start(arr2);
        // await Bacarrat_ll.start();
        console.log("后一半数据库");
    }
    res.send("baccarat_ll success");
});

router.get('/redvsblue',async (req,res)=>{
    //判断执行次数
    console.log("==============================================================");
    //判断超时
    // let overtime= Timeout.timeout();
    //
    // if (overtime===true){
    //     let j=await Internal.get_count();
    //     if (parseInt(j)%2===0){
    //         let db=await Internal.get_beforeDb();
    //         let arr1= await db.split(",");
    //         await Bacarrat_ll.start(arr1);
    //     } else {
    //         let db=await Internal.get_afterDb();
    //         let arr2=await db.split(",");
    //         await Bacarrat_ll.start(arr2);
    //     }
    // } else {//1 3 5
    //     let data=await Internal.get_afterDb();
    //     let arr2=data.split(",");
    //     await Bacarrat_ll.start(arr2);
    //     // await Bacarrat_ll.start();
    //     console.log("后一半数据库");
    // }
    await RedBlue.start();
    res.send("RedBlue success");
});

router.get('/',async (req,res)=>{
    res.send("success");
});

// =======
// let Iemainder_redis=require('../utils/remainder_redis');
// let Internal=require('../db/internal');
// let Sleep=require('../utils/sleep');
// router.get("/redvsblue",async(req,res)=>{
//     await RedBlue.start();
//     // req.send("success");
// });

router.get("/:name",async(req,res,next)=>{
   if (req.params.name==="baccarat_internal"||req.params.name==="baccarat"){
       next();
   }
},async(req,res)=>{
    let number = await Internal.get_count();
    if (req.params.name==="baccarat_internal") {

        let arrInternal = await Iemainder_redis.getRobotAccounts(number);
        // console.log("arrInternal:==========baccarat_internal",arrInternal);
        await Bacarrat_internal.start(arrInternal);
        res.send("baccarat_internal success");
    }
    // }else if(req.params.name==="baccarat"){
    //     // let arrInternal=await Iemainder_redis.getRobotAccounts(number);
    //     // console.log("=========baccarat prepare"+arrInternal);
    //     await Bacarrat.start();
    //     res.send("baccarat success");
    // }else {
    //     res.send("error");
    // }
});
module.exports=router;