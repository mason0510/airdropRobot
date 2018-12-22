require("../db")

//获取对应的表
let AirUser=require("../model/godappuser");
let count=0;
(async ()=>{
    let results= await AirUser.find({});
// results.forEach(async (item,index)=>{
//     console.log(item.username+index);
// //对这些用户进行转账
//     count++;
//
// //转账延时
//     setTimeout(function() { console.log(console.log("当前账户"+item.username+"总第"+count+"次转账")); }, index*1000);
// })

    for (let i = 0; i <results.length ; i++) {

        setTimeout(function() {
            count++;
            console.log("aaaa"+count+results[i].username)}, i*100);
    }

})();
