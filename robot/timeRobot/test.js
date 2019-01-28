require('../../db/db');
let Internal=require('../../db/internal');
let HumanAis=require('../../model/humanAI');

let predata;

let db1=[];
let db2=[];
let aa=async ()=>{
    let resa=await HumanAis.find({});
    console.log(resa.length);
    for (let i = 0; i <resa.length; i++) {
        // console.log(resa[i].accountname);
        if (i<=61) {
                await db1.push(resa[i].accountname);
                //await  Internal.set_beforeDb(db1.toString());
        } else  {

            await db2.push(resa[i].accountname);
            await  Internal.set_afterDb(db2.toString());
        }
    }
};
//已经设置值
aa();

// getdb=async ()=>{
//     //取出db1
//     let aa=await Internal.get_beforeDb();
//     // let bb=await Internal.get_afterDb();
//     console.log(aa);
//     // console.log(bb);
//     // console.log(db3);
//     // let objects=await JSON.parse(db3);
//     // console.log(objects);
//     // objects.forEach((item,index)=>{
//         // console.log(item.accountname);
//     // });
//     //取出db2
//     // let db2=await Internal.get_beforeDb(db1.toString());
// }
// getdb();