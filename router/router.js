let express=require('express');
let RedBlue=require('../robot/redblack/redBlack');
let router=express.Router();
let constants=require('../utils/constants');
//引入服务层controller
let accountService = require('../service/accountservice');


// let Bacarrat= require('../robot/bacarrat/bacarrat');
let Bacarrat_internal= require('../robot/bacarrat/bacarrat_internal');

let Iemainder_redis=require('../utils/remainder_redis');

// let robot;
router.get('/',async (req,res)=>{
    res.send("test");
});


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
       await Bacarrat_internal.start(arrInternal);
        res.send("baccarat_internal success");
    }else if(req.params.name==="redvsblue"){
        await RedBlue.start();
        res.send("redvsblue success");
    }
});
module.exports=router;