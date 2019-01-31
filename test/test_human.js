require('../db/db');
let HumanAI=require("../model/humanAI");
let Internal=require("../db/internal");
let start=async ()=>{

    // let alldata=await HumanAI.find({});
    let arr=[];
    // alldata.forEach((item)=>{
    //     arr.push(item);
    // });
    // console.log(arr);
    // await Internal.set_humanais(JSON.stringify(arr));
     let str=await Internal.get_humanais();
      arr=await JSON.parse(str);
    for (let i = 0; i <arr.length ; i++) {
        console.log(arr[i].publickey);
    }

};
start();
