let Internal=require('../../db/internal');
let Time=require('../../utils/time');
const schedule = require('node-schedule');
/**
 * 程序启动之前执行一次
 * @type {Function}
 */
setTimeandCount=(async ()=>{
    let time=await Time.nowTime();
    console.log("设置前的时间",time);
    await Internal.set_beginTime(time);
    await Internal.set_count(4);
    let btime= await Internal.get_beginTime();
    let count= await Internal.get_count();
    console.log(btime+"=========="+count);
});
setTimeandCount();
<<<<<<< HEAD



=======
>>>>>>> a84cf316b21b6c76e9ad87260427f71699186a69
//24小时执行一次
// const begintask = ()=>{
//     //'30 1 1 * * *'  30 1 * * * *
//     schedule.scheduleJob('1-10 * * * * *', async ()=>{
//       // await setTimeandCount();
//         console.log("==========hellwo=========");
//     })
// };
//
// begintask();

