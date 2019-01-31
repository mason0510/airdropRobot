let Internal=require('../db/internal');
let GetInternal=require('../robot/parameterSet/getInternal');
let overtime;
let Time=require('../utils/time');
task1=async ()=> {
    //首次执行 0
    //从redis 读取当前count
    let begin_time = await Internal.get_beginTime();
    // console.log("从redis获取到的begin_time:", begin_time);

    let networkTime = await Time.networktime();
    //保存网络时间
    await Internal.set_Time(networkTime);
    console.log("networkTime:", parseInt(networkTime / 1000));

    //  转化成小时
    let internalTime = parseInt(networkTime / 1000) - parseInt(begin_time);
    console.log("internalTime:======================"+internalTime);

    if (internalTime >= 5) {
        //间隔了200秒
        await Internal.set_beginTime(networkTime / 1000);
        //当前已超时 时间重置
        console.log("当前已超1小时");
        await Internal.set_Internal(true);
        //返回true

    }else {
        console.log("当前未超时1小时");
    }
};
let request=async ()=>{
    //判断是否超时
    await task1();
   overtime= await Internal.get_Internal();
   console.log("===========overtime"+overtime);

if (overtime==="true"){// A B
    let dbType=await Internal.get_DbType();
    if (dbType==="after"){
        console.log("before");
        await Internal.set_DbType("before");
    } else if (dbType==="before") {
        console.log("after");
        await Internal.set_DbType("after");
    }
    await Internal.set_Internal(false)
} else if (overtime==='false') {//1 3 5
    console.log("后一半数据库");
    //判断当前数据库类型 是什么 A
    //当前使用的是啥就是啥
   let db=await Internal.get_DbType();
   if (db==="after"){
       console.log("after");
   }else if(db==="before"){
       console.log("before");
   }
}
}

// request();
