let Internal=require('../db/internal');

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));
// expected output: 1

// start from index 2
console.log(beasts.indexOf('bison', 2));
// expected output: 4

console.log(beasts.indexOf('giraffe'));

// let aa=async ()=>{
//     // await Internal.set_testDb(beasts.toString());
//     // let arr=await Internal.get_testDb();
//     // // console.log(JSON.parse(arr));
//     // let json=await JSON.parse(arr);
//     // console.log("======================"+json.length);
//     // for (let i = 0; i <json.length ; i++) {
//     //     console.log("json:"+json[i]);
//     // // }
//     // let count=await Internal.get_count();
//     // let j=parseInt(count);
//     // console.log(j%2);
//     // console.log(j);
//     // j++;
//     // await Internal.set_count(j.toString());
//     //
//     let db=await Internal.get_beforeDb();
//     let count=await Internal.get_count();
//     let playerInfo=await Internal.get_PlayerInfo();
//     let arr2=await db.splice(",");
//     // console.log("arr2:==========="+arr2);
//     // console.log("count:==========="+count);
//     console.log("playerInfo:==========="+playerInfo);
// };
// aa();
test=async ()=>{
    let db=await Internal.get_beforeDb();
    console.log("db"+db);
}
test();
