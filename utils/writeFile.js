let fs=require("fs");
//异步读取
// fs.readFile('../betsInfo',async(err,data)=>{
//     if (err){
//         return console.error(err);
//     }
//     console.log("异步读取:"+data.toString())
// });
//同步读取
let data = fs.readFileSync('../betsInfo');
console.log("同步读取: " + data.toString());

console.log("程序执行完毕。");