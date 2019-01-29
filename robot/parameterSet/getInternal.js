let Internal=require('../../db/internal');
let Time=require('../../utils/time');
task=async ()=> {
    //首次执行 0
    //从redis 读取当前count
    let begin_time = await Internal.get_Iime();
    // console.log("从redis获取到的begin_time:", begin_time);

    let networkTime = await Time.networktime();
    //保存网络时间
      await Internal.set_Time(networkTime.toString());
    console.log("networkTime:", parseInt(networkTime / 1000));

    //  转化成小时
    let internalTime = parseInt(networkTime / 1000) - parseInt(begin_time/1000);
    console.log("internalTime:======================"+internalTime);

    if (internalTime >= 3600) {
        //间隔了200秒
        await Internal.set_beginTime((networkTime / 1000).toString());
        //当前已超时 时间重置
        console.log("当前已超1小时");
        await Internal.set_Internal("true");
        //返回true

    }else {
        console.log("当前未超时1小时");
    }
};
task();

module.exports={task};