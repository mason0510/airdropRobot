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
task=async ()=> {
    //首次执行 0
    //从redis 读取当前count
    let i = await Internal.get_count();
    let begin_time = await Internal.get_beginTime();
    console.log("从redis获取到的begin_time:", begin_time);

    let networkTime = await Time.networktime();
    console.log("networkTime:", parseInt(networkTime / 1000));
    console.log("begin_time:", begin_time);

    //  转化成小时
    let internalTime = parseInt(networkTime / 1000) - parseInt(begin_time);
    console.log("internalTime:", internalTime);
    if (internalTime >= 3600) {
        //间隔了200秒
        i++;
        //重置开始时间
        await Internal.set_beginTime(networkTime / 1000).then(() => {
            console.log("'保存成功");
        });
        //设置当前的count
        console.log("更换账户前最后检查count:", i);
        if (i >= 24) {
            console.log("i的值又到新的一轮循环==================================================="+i);
            //业务代码
            arr=RobotAccountConstants.arr24;
            await Internal.set_count(1).then(() => {
                console.log("count:保存成功", 1);
            });
         }
        //保存当前信息
         else {
            await Internal.set_count(i).then(() => {
                console.log("count:保存成功", i);
            });
        }
        // let btime = await Internal.get_beginTime();
        // let count = await Internal.get_count();
        // console.log("50s之后保存的心新时间" + btime + "====================" + count);

    if (i===2){
        console.log("最后执行2"+i);
        //业务代码
        arr=RobotAccountConstants.arr2;
        console.log("最后执行arr"+"=========="+arr);
    }
    if (i===3){
        console.log("最后执行3"+i);
        //业务代码
        arr=RobotAccountConstants.arr3;
        console.log("最后执行arr"+"=========="+arr);
    }
    if (i===4){
        console.log("最后执行4"+i);
        //业务代码
        arr=RobotAccountConstants.arr4;
        console.log("最后执行arr"+"=========="+arr);
    }
    if (i===5){
        console.log("最后执行5"+i);
        //业务代码
        arr=RobotAccountConstants.arr5;
        console.log("最后执行arr"+"=========="+arr);
    }
    if (i===6){
            console.log("最后执行6"+i);
            //业务代码
        arr=RobotAccountConstants.arr6;
        console.log("最后执行arr"+"=========="+arr);
        }
        if (i===7){
            //首次执行
            console.log("最后执行7"+"=========="+i);
            //业务代码
            arr=RobotAccountConstants.arr7;
            console.log("最后执行arr"+"=========="+arr);
        }
        if (i===8){
            //首次执行
            console.log("最后执行8"+"=========="+i);
            //业务代码
            arr=RobotAccountConstants.arr8;
            console.log("最后执行arr"+"=========="+arr);
        }
        if (i===9){
            console.log("最后执行9"+i);
            //业务代码
            arr=RobotAccountConstants.arr9;
            console.log("最后执行arr"+"=========="+arr);
        }
        if (i===10){
            console.log("最后执行10"+10);
            //业务代码
            arr=RobotAccountConstants.arr2;
            console.log("最后执行arr"+"=========="+arr);
        }
        if (i===11){
            console.log("最后执行11"+i);
            //业务代码
            arr=RobotAccountConstants.arr11;
            console.log("最后执行arr"+"=========="+arr);
        }
        if (i===12){
            console.log("最后执行12"+i);
            //业务代码
            arr=RobotAccountConstants.arr12;
            console.log("最后执行arr"+"=========="+arr);
        }
        if (i===13){
            console.log("最后执行13"+i);
            //业务代码
            arr=RobotAccountConstants.arr13;
            console.log("最后执行arr"+"=========="+arr);
        }    if (i===14){
            //首次执行
            console.log("最后执行14"+"=========="+i);
            //业务代码
            arr=RobotAccountConstants.arr14;
            console.log("最后执行arr"+"=========="+arr);
        }
        if (i===15){
            console.log("最后执行15"+i);
            //业务代码
            arr=RobotAccountConstants.arr15;
            console.log("最后执行arr"+"=========="+arr);
        }
        if (i===16){
            console.log("最后执行16"+i);
            //业务代码
            arr=RobotAccountConstants.arr16;
            console.log("最后执行arr"+"=========="+arr);
        }
        if (i===17){
            console.log("最后执行17"+i);
            //业务代码
            arr=RobotAccountConstants.arr17;
            console.log("最后执行arr"+"=========="+arr);
        }
        if (i===18){
            console.log("最后执行18"+i);
            //业务代码
            arr=RobotAccountConstants.arr18;
            console.log("最后执行arr"+"=========="+arr);
        }
        if (i===19){
            console.log("最后执行19"+i);
            //业务代码
            arr=RobotAccountConstants.arr19;
            console.log("最后执行arr"+"=========="+arr);
        }
        if (i===20){
            //首次执行
            arr=RobotAccountConstants.arr20;
            console.log("最后执行20"+"=========="+i);
            //业务代码
            arr=[1];
            console.log("最后执行arr"+"=========="+arr);
        }
        if (i===21){
            arr=RobotAccountConstants.arr21;
            console.log("最后执行21"+i);
            //业务代码
            console.log("最后执行arr"+"=========="+arr);
        }
        if (i===22){
            console.log("最后执行22"+i);
            //业务代码
            arr=RobotAccountConstants.arr22;
            console.log("最后执行arr"+"=========="+arr);
        }
        if (i===23){
            console.log("最后执行23"+i);
            //业务代码
            arr=RobotAccountConstants.arr23;
            console.log("最后执行arr"+"=========="+arr);
        }
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
    }
    return arr
};
/**
 * 开始时间 单位s
 * @param begin_time
 */
let getRobotAccounts=async ()=>{
    //获取账户
    let accountArr=await task();
    // for (let i = 0; i <accountArr.length ; i++) {
    //     console.log(accountArr[i]);
    // }
    // setTimeout(getRobotAccounts,1000);
    return accountArr;
};
module.exports={getRobotAccounts};

// getRobotAccounts();
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
// redis=async ()=>{
//     await Internal.set_count(1);
//     let count=await Internal.get_count();
//     console.log(count);
// };
// redis();


