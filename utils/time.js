
//转换成秒
nowTime=async()=>{
  let currenttime=await Date.now();
  console.log(parseInt(currenttime/1000))
    return parseInt(currenttime/1000);
};

module.exports={nowTime}