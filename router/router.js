let express=require('express');
let RedBlue=require('../robot/redblack/redBlack');
let router=express.Router();
let robotAccountConstants=require('../utils/robotAccountConstants');
let Bacarrat= require('../robot/bacarrat/bacarrat');
let Bacarrat_internal= require('../robot/bacarrat/bacarrat_internal');
let Iemainder_redis=require('../utils/remainder_redis');
let Internal=require('../db/internal');
let Sleep=require('../utils/sleep');
router.get("/redvsblue",async(req,res)=>{
    await RedBlue.start();
    // req.send("success");
});

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