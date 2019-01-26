// let count=1; //0 zz   1 aa   2 mm  23
//每隔一个小时执行一次
require('../db/db');
let IntervalTime=require('../model/intervalTime');
let arr=[];

let task=async ()=>{
    //首次执行 0
    //count 从数据库读取数据
    let count;
    let query={common_user:"internalUser"};
    let intervalTime=await IntervalTime.find({});
    intervalTime.forEach(item=>{
        count= item.bet_interval_count;
        console.log("数据库当前信息"+item.bet_interval_count);
        console.log("数据库当前信息"+item.begin_time);
    });
   //console.log("取余数"+count%24);
   console.log("执行之前"+count);
    if (count===1){
           console.log("最后执行1"+"=========="+count);
           //业务代码
           arr=[1];
       }
    if (count===2){
        console.log("最后执行2"+count);
        //业务代码
        arr=[2];
    }
    if (count===3){
        console.log("最后执行3"+count);
        //业务代码
        arr=[3];
    }
    if (count===4){
        console.log("最后执行4"+count);
        //业务代码
        arr=[4];
    }
    if (count===5){
        console.log("最后执行5"+count);
        //业务代码
        arr=[5];
    }
    if (count===24){
        console.log("最后执行24"+count);
        await  IntervalTime.findOneAndUpdate(query, { bet_interval_count: 1,}, {multi: true},()=>{
            console.log("reset count"+count);
        });
        //业务代码
        arr=[24]
    }
    await count++;
    //count 写入数据库
    await  IntervalTime.findOneAndUpdate(query, { bet_interval_count: count,}, {multi: true},()=>{
        console.log("reset count"+count);
    }).then(async ()=>{
        let dateTime=new Date().getTime();
        let sencondTime=parseInt(dateTime/1000);
        await  IntervalTime.findOneAndUpdate(query, { begin_time: sencondTime,}, {multi: true},()=>{
            console.log("reset getTime"+sencondTime);
        });
    });

    let intervalTime2=await IntervalTime.find({});
    intervalTime2.forEach(item=>{
        count= item.bet_interval_count;
        console.log("执行后数据库当前信息"+item.bet_interval_count);
    });
    return arr
};
let active=()=>{
    let accountArr=task();
    // if (accountArr===null)return
    // accountArr.forEach(item=>{
    //     console.log("账户"+item);
    // });
    setTimeout(active,500);
};
active();
// let db=async ()=>{
//   //创建数据库
//     let intervalTime=new IntervalTime({
//         common_user:"internalUser",
//         bet_interval_count:1,
//         begin_time:new Date().getTime()
//     });
//     await IntervalTime.create(intervalTime).catch(errmsg=>{console.error(errmsg)});
// };
// db()