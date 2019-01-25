let express=require('express');
// let Start=require('../robot/redblack/redBlack');
let Bacarrat=require('../robot/bacarrat/bacarrat');
let router=express.Router();
//引入服务层controller
let accountService = require('../service/accountservice');
let test;
//verify
router.get('/:name',async (req,res,next)=>{
    // test=await Start.start();
    if (req.params.name==="start"){
        next();
    }
},async (req,res)=>{
       await Bacarrat.start();
        res.send("success");
});

router.get('/:usrname',async (req,res)=>{
    res.send(req.params.username);
});


module.exports=router;