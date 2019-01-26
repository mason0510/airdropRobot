const schedule = require('node-schedule');
let rentEos=require("../eostools/cpuTransaction");
let rentcpu=async ()=>{
    let body=await rentEos.querycpuPrice();
    let price=body.rows[0].price;
    let minute=body.rows[0].duration;
    let amount=body.rows[0].duration;
    console.log("=========="+price+amount);
};

rentcpu();


const  scheduleCronstyle = ()=>{
    //每周一执行一次:  '30 1 1 * * 1'
    schedule.scheduleJob('30 1 1 * * 1',()=>{
        console.log('scheduleCronstyle:' + new Date());
    });
};

scheduleCronstyle();