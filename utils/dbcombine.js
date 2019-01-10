//建立新表
require('../db/db')
let Godappusrs=require("../model/godappusr");
let Godappusers=require("../model/godappuser");
let Topdapp=require("../model/topdapp");
let Betdiceuser=require("../model/betdiceUser");
let User=require("../model/betdice");

//查找当前表 获取
combine=async ()=> {
    const results = await Godappusrs.find({});

    console.log("begin");
    //Topdapp
    // const Topusers = await Topdapp.find({});

    //Betdiceuser
    // const Betdiceusers = await Betdiceuser.find({});

    //User
    const Users = await Godappusers.find({});

    //插入当前表格
    for (let i = 0; i < Users.length; i++) {

            let res = await Godappusrs.findOne({username: Users[i].username});
            if (!res) {
                console.log("用户"+Users[i].username);
                let usr = new Godappusrs({
                    username: Users[i].username,
                    assets: Users[i].assets,
                    block_time: "",
                    trx_id: "",
                    memo: "",
                    created: Date.now()
                });
                await Godappusrs.create(usr)
                console.log( "success");
            } else {
                console.log("已存在");
            }
        console.log(res);
        }

    }


combine();


