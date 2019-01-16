let request=require("superagent");
let constants=require("../utils/constants");
//转换成秒
nowTime=async()=>{
  let currenttime=await Date.now();
  console.log(parseInt(currenttime/1000))
    return parseInt(currenttime/1000);
};

//获取精确的网路时间

let networktime=async ()=>{
  //获取网络时间
    let promise=new Promise(async resolve=>{
        await request
            .get(constants.timeurl)
            .timeout({
                deadline:constants.deadlineTime,
                response:constants.responseTime
            })
            .then(res=>{
                //console.log(res.body.data.t);
                // let now=Date.now();
                let t=res.body.data.t;
                // console.log(now);
                // console.log(typeof t);
                resolve(Number(res.body.data.t));
            })
    })
    return promise;
};

module.exports={nowTime,networktime};
// networktime();
// let test=async ()=>{
//     //获取时间差
//     let networktime=await networktime;
//     let now=new Date();
//     console.log(now);
//     console.log(networktime);
// };
// test()
networktime();