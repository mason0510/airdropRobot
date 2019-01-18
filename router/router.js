let express=require('express');
let Start=require('../robot/redBlack');
let router=express.Router();
//引入服务层controller
let accountService = require('../service/accountservice');

let test;
router.get('/start',async (req,res)=>{
     test=await Start.start();
     console.log("==========router"+test);
    res.send({code:0,msg:test});
});

router.get('/:usrname',async (req,res)=>{
    let user = await accountService.getUserByUsername(req.params.username);
    res.success(user);
});

router.post('./login',async (req,res)=>{
    let token = await accountService.login(req.body);
    res.send(token);
});

router.post('/register', async (req, res) =>{
    await accountService.register(req.body)
    res.success()
});

router.delete('/user/:id',async function (req,res,next) {
   if (req.params.id===0)next('route');
   else next();
},async function (req,res,) {
    await accountService.deleteUser(req.params.id)
    res.success()
});

module.exports=router;