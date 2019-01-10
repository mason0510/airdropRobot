
getTime=async (entime)=>{
    let currenttime=Math.round(new Date().getTime()/1000);
    let timeuntil=entime-currenttime;
    if (timeuntil<=0){
        console.log("当前游戏结束了");
        return
    }
    console.log("游戏进行中")
    return (entime-currenttime);
}
module.exports={getTime}