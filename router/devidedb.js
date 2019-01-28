// let count=1; //0 zz   1 aa   2 mm  23
//每隔一个小时执行一次
require('../db/db');
let IntervalTime=require('../model/intervalTime');

let RobotAccountConstants=require('../utils/robotAccountConstants');
let Internal=require('../db/internal');
let Time=require('../utils/time');
// let begin_time=1548410303;
// let count
let arr=RobotAccountConstants.arr1;
let overtime;
task=async ()=> {
    //首次执行 0
    //从redis 读取当前count
    let begin_time = await Internal.get_beginTime();
    console.log("从redis获取到的begin_time:", begin_time);

    let networkTime = await Time.networktime();
    console.log("networkTime:", parseInt(networkTime / 1000));
    console.log("begin_time:", begin_time);

    //  转化成小时
    let internalTime = parseInt(networkTime / 1000) - parseInt(begin_time);
    console.log("internalTime:"+internalTime);
    
    if (internalTime >= 3600) {
        //间隔了200秒
        await Internal.set_beginTime(networkTime / 1000);
        //当前已超时 时间重置
        console.log("当前已超1小时");
        //返回true
        overtime=true;
        return overtime;
    }else {
        console.log("当前未超时1小时");
        overtime=false;
        return overtime;
    }
        
    return arr
};
/**
 * 开始时间 单位s
 * @param begin_time
 */
let timeout=async ()=>{
    //获取账户
    let i=await Internal.get_count();
    console.log('当前所保留的i'+i);

    let overtime=await task();
    console.log("====="+overtime);
    i++;
    console.log("执行后所保留的i"+i);
    await Internal.set_count(i);

    return overtime;
};
module.exports={timeout};

timeout();





