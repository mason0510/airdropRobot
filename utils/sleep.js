
sleep=async (ms)=>{
    return new Promise(async resolve=>await setTimeout(resolve,ms))
}
module.exports={sleep}
