const fs=require('fs');
path=require('path');
//path.join()
//读取文件
// fs.readFile(path.join(__dirname,"sample"),'utf-8',(err,data)=>{
//     //console.log(data);
//     if (err){
//     console.log(err);
//     }else {
//         console.log(`${data}`);
//     }
// });
// //写入文件 返回buffer
// fs.readFile(path.join(__dirname,"sample"),async (err,data)=>{
//     if (err)console.log(err);
//     else {
//         console.log(`${data.length}`);
//         //转string
//         let s=data.toString('utf-8');
//         let s1=Buffer.from('zhaotong','utf-8');
//         console.log(s);
//         console.log(s1);
//     }
// });

try {
    //异步写入文件
    let data=fs.readFileSync(path.join(__dirname,'sample'),'utf-8');
    console.log(typeof data);
    
    //异步写入 先执行
    // let content1='nodejs'
    // fs.writeFile(path.join(__dirname,'sample'),'utf-8',err=>{
    //     if (err)console.log(err);
    //     else console.log(`写入成功`);
    // })
   // let content2='java'
    //同步写入
   // fs.writeFileSync(path.join(__dirname,'sample'),content2);


}catch (e) {
    console.log(e);
}
