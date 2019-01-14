
//转换成秒
nowTime=async()=>{
  let currenttime=await Date.now();
  //console.log(currenttime)
    return currenttime;
};

module.exports={nowTime}