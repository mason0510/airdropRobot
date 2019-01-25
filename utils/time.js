let request=require("superagent");
let constants=require("../utils/constants");
//转换成秒
nowTime=async()=>{
  let currenttime=await Date.now();
  console.log(parseInt(currenttime/1000))
    return parseInt(currenttime/1000);
};

//获取精确的网路时间
let begintime;
let latertime;
let begintime2=0;
let latertime2;
let begintime3;
let latertime3;

networktime=async ()=>{
  //获取网络时间
    let promise=new Promise(async resolve=>{
        await request
            .get(constants.timeurl)
            .timeout({
                deadline:constants.deadlineTime,
                response:constants.responseTime
            })
            .then(res=>{
                // console.log(res.body.data.t);
                let t=res.body.data.t;
                // console.log(typeof t);
                let nettime=parseInt(((res.body.data.t)));
                // console.log( parseInt(nettime/1000));
                resolve(nettime);
            })
    });
    return promise;
};

module.exports={nowTime,networktime};
// networktime();
// nowTime(); //1548408093 1548408860
//networktime 1548408447211
// test=async ()=>{
//     //获取时间差
//      begintime=await networktime();
//     let now=new Date().getTime();
//    // console.log(now);
//     let timestamp=begintime;
//     console.log("首次的开始时间"+timestamp);
//     //记录当前时间
// };
// let arr1=[0,1,2];
// let arr2=[4,5,6];
// let arr3=[7,8,9];
// let arr=[0,1,2];
// let count=0;
// test1=async ()=>{
//     //获取时间差
//     latertime=await networktime();
//     let now=new Date().getTime();
//    // console.log(now);
//     let timestamp=latertime;
//     let difference= latertime-begintime;
//     if (difference>5000) {
//         //首次超过
//         count++;
//         console.log("第"+count+"次超过==========更换账号");
//         arr.forEach(item=>{
//            // console.log(item);
//         });
//
//         //重置开始时间
//         begintime=await networktime();
//         //激活第二个时间
//         // begintime2=await networktime();
//         console.log(count);
//
//
//         // if (begintime2>0){
//         //     arr=[3,4,5];
//         //     console.log("第二次超过==========更换账号");
//         //     arr.forEach(item=>{
//         //     console.log(item);
//         //     })
//         // }
//     }
//     if (count%24===0){
//         console.log("=================="+count%24);
//     }
// };
//
//
//
// //再次获取时间
// let start=async ()=>{
//     test1();
//     setTimeout(start,1000);
// };
// test();
// start();
// networktime();
//标记当前时间