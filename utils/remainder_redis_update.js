// let count=1; //0 zz   1 aa   2 mm  23
//每隔一个小时执行一次
require('../db/db');
let IntervalTime=require('../model/intervalTime');
let arr=[];

let RobotAccountConstants=require("../utils/robotAccountConstants");
let Internal=require('../db/internal');
let Time=require('../utils/time');
// let begin_time=1548410303;
// let count
task=async ()=>{
    //从redis 读取当前count
    let i=await Internal.get_count();
    let begin_time=await Internal.get_beginTime();
    console.log("从redis获取到的begin_time:",begin_time);

    let networkTime=await Time.networktime();
    console.log("networkTime:",parseInt(networkTime/1000));
    console.log("begin_time:",begin_time);

    //  转化成小时
    let internalTime=parseInt(networkTime/1000)-parseInt(begin_time);
    console.log("internalTime:",internalTime);
    if (internalTime>=20){
        //间隔了200秒
        console.log("20s,保存时间");
         i++;
        //重置开始时间
        await Internal.set_beginTime(networkTime/1000).then(()=>{
            console.log("'保存成功");
        });
        //设置当前的count
        console.log("count:",i);
        if (i>=24) {
            await Internal.set_count(1).then(()=>{
                console.log("count:保存成功",1);
            });
        }else {
            await Internal.set_count(i).then(()=>{
                console.log("count:保存成功",i);
            });
        }


        //打印保存时间

           let btime= await Internal.get_beginTime();
           let count= await Internal.get_count();

           console.log("50s之后保存的心新时间"+btime+"===================="+count);

    }
   console.log("执行之前"+i);


    // if (count===1){
    //     //首次执行
    //        console.log("最后执行1"+"=========="+count);
    //        //业务代码
    //        arr=[1];
    //    }
    // if (count===2){
    //     console.log("最后执行2"+count);
    //     //业务代码
    //     arr=[2];
    // }
    // if (count===3){
    //     console.log("最后执行3"+count);
    //     //业务代码
    //     arr=[3];
    // }
    // if (count===4){
    //     console.log("最后执行4"+count);
    //     //业务代码
    //     arr=[4];
    // }
    // if (count===5){
    //     console.log("最后执行5"+count);
    //     //业务代码
    //     arr=[5];
    // }
    // if (count===24){
    //     console.log("最后执行24"+count);
    //     await  IntervalTime.findOneAndUpdate(query, { bet_interval_count: 1,}, {multi: true},()=>{
    //         console.log("reset count"+count);
    //     });
    //     //业务代码
    //     arr=[24]
    // }
    //  count++;
    // console.log("执行代码后的count:",count);
    // await Internal.set_count(count);

    //count 写入数据库
    // await  IntervalTime.findOneAndUpdate(query, { bet_interval_count: count,}, {multi: true},()=>{
    //     console.log("reset count"+count);
    // }).then(async ()=>{
    //     let dateTime=new Date().getTime();
    //     let sencondTime=parseInt(dateTime/1000);
    //     await  IntervalTime.findOneAndUpdate(query, { begin_time: sencondTime,}, {multi: true},()=>{
    //         console.log("reset getTime"+sencondTime);
    //     });
    // });
    //
    // let intervalTime2=await IntervalTime.find({});
    // intervalTime2.forEach(item=>{
    //     count= item.bet_interval_count;
    //     console.log("执行后数据库当前信息"+item.bet_interval_count);
    // });
    return arr
};
/**
 * 开始时间 单位s
 * @param begin_time
 */
let getRobotAccounts=async ()=>{
    let accountArr=await task();
    // accountAr
    setTimeout(getRobotAccounts,200);
};
module.exports={getRobotAccounts};



