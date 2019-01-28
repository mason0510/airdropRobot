let express=require('express');
let RedBlue=require('../robot/redblack/redBlack');
let router=express.Router();
let constants=require('../utils/constants');
//引入服务层controller
let accountService = require('../service/accountservice');


// let Bacarrat= require('../robot/bacarrat/bacarrat');
let Bacarrat_internal= require('../robot/bacarrat/bacarrat_internal');

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

router.get('/test',async (req,res)=>{
    //判断执行次数
    let i=0;
    i++;
    await Internal.set_count(i);
    //判断超时
    let overtime= Timeout.timeout();
    if (overtime===true){
        let j=Internal.get_count();
        if (j%2===0){
            let arr1=await Internal.get_beforeDb().split(",");
            console.log("get_beforeDb");
        } else {
            let arr2=await Internal.get_afterDb().split(",");
            // await Bacarrat_ll.start(arr2);
            console.log("get_afterDb");
        }
    } else {//1 3 5
        let arr2=await Internal.get_afterDb().splice(",");
        //await Bacarrat_ll.start(arr2);
        console.log("get_afterDb");
    }
    res.send(i+"baccarat_ll success");
});

router.get('/',async (req,res)=>{
    res.send("success");
})

router.get("/:name",async(req,res,next)=>{
   if (req.params.name==="baccarat_internal"||req.params.name==="redvsblue"||req.params.name==="baccarat"){
       next();
   }
},async(req,res)=>{
    if (req.params.name==="baccarat_internal") {
        let arrInternal=await Iemainder_redis.getRobotAccounts();
        console.log("arrInternal:==========",arrInternal);
        if (arrInternal==="undefined"){return}
        console.log("=========prepare"+arrInternal);
        //暂时先用这几个账户
       await Bacarrat_internal.start(robotConstants.arr7);
        res.send("baccarat_internal success");
    }else if(req.params.name==="redvsblue"){
        await RedBlue.start();
        res.send("redvsblue success");
    }
});
module.exports=router;