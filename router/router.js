let express=require('express');
let RedBlue=require('../robot/redblack/redBlack');
let router=express.Router();
let constants=require('../utils/constants');
//引入服务层controller
let accountService = require('../service/accountservice');


let Bacarrat= require('../robot/bacarrat/bacarrat');

// let test;
router.get('/',async (req,res)=>{
    res.send("test");
});


router.get("/:name",async(req,res,next)=>{
   if (req.params.name==="baccarat"||req.params.name==="redvsblue"){
       next();
   }
},async(req,res)=>{
    if (req.params.name==="baccarat") {
        await Bacarrat.start();
        res.send("baccarat success");
    }else if(req.params.name==="redvsblue"){
        await RedBlue.start();
        res.send("redvsblue success");
    }
});
module.exports=router;