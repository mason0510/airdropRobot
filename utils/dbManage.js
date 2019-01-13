//建立新表
require('../db/db')
let Robot=require("../model/robotplayersIncome");


// //查找当前表 获取
// combine=async ()=> {
//     const results = await Godappusrs.find({});
//
//     console.log("begin");
//     //Topdapp
//     // const Topusers = await Topdapp.find({});
//
//     //Betdiceuser
//     // const Betdiceusers = await Betdiceuser.find({});
//
//     //User
//     const Users = await Godappusers.find({});
//
//     //插入当前表格
//     for (let i = 0; i < Users.length; i++) {
//
//             let res = await Godappusrs.findOne({username: Users[i].username});
//             if (!res) {
//                 console.log("用户"+Users[i].username);
//                 let usr = new Godappusrs({
//                     username: Users[i].username,
//                     assets: Users[i].assets,
//                     block_time: "",
//                     trx_id: "",
//                     memo: "",
//                     created: Date.now()
//                 });
//                 await Godappusrs.create(usr)
//                 console.log( "success");
//             } else {
//                 console.log("已存在");
//             }
//         console.log(res);
//         }
//
//     }
//
//
// combine();

let save=async(accountname,count,allAmount)=>{
    //其他从链上获取
    let newPlayer = new Robot({
        name:accountname,
        in:0,
        out:0,
        play_times:"0",
        last_play_time:"0",
        totalAmount:'0',
        allTimes:count,
        AllRobot:allAmount,
    });
    try {
      let result= Robot.find({});
      if (result!==-1){
          await  Robot.create(newPlayer);
      }else {
          let quary={name:accountname};
          await  Robot.findOneAndUpdate(query, { allTimes: count }, {multi: true},()=>{
              // console.log("save");
          });
          await  Robot.findOneAndUpdate(query, { AllRobot: allAmount }, {multi: true},()=>{
              // console.log("save");
          });
      }
    }catch (e) {
        console.log(e)
    }

};

module.exports={save};


