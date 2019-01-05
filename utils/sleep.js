
sleep=async (ms)=>{
    return new Promise(async resolve=>await setTimeout(resolve,ms))
}
module.exports={sleep}


// const queryaccount=async ()=>{
//     for (let i = 0; i <10 ; i++) {
//        await sleep(1000)
//         console.log("for循环===");
//     }
//
//     await setTimeout(queryaccount,1000)
//     console.log("=====");
// };
//
// queryaccount()
