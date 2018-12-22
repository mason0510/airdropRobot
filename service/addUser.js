//服务器 https://betdice.one/dice/prod/api/contest/3/1545206400/EOS/
//设置配置 获取表实例 let User=require("../model/betdiceUser");
// require("../db")
require("../db")
let Betdiceuse=require("../model/betdiceUser")
let User=require("../model/betdice");
//查询user表
const handle=async ()=>{
    //取出所有的用户
    try {
        const results = await User.find({});
        results.forEach(async (item) => {
            //每一个条目item undefined
            if (item.username !== "undefined") {
               // console.log(item.username);
                let res = Betdiceuse.find({assets: item.assets}).limit(1);
                if (!res) {
                    console.log("用户不存在")
                    //may not be in mongodb 账户名 资产 创建时间
                    let user1 = new Betdiceuse({
                        username: item.username,
                        assets: item.assets,
                        created: Date.now()
                    });
                    console.log(user1)
                   await Betdiceuse.create(user1);
                    console.log("保存成功"+user1.username)
                }
            }

        })

    } catch (err) {
        throw err;
    }

}
//去除重复的不能识别的
const removeundefine=async ()=>{
    console.log("delete");
    //查询所有的
   const results=await Betdiceuse.find({});
    results.forEach(async (item)=>{
        if (item.username===undefined){
            let res=await Betdiceuse.deleteOne({username:item.username});
            console.log("res"+res)
            if (res.n<1){
                console.log("删除失败")
            }
        }
    })
};

const removeSameName=async ()=>{
    console.log("removeSameName");

};


// handle().catch(result=>{
//     console.log(result)
// })

// removeundefine().catch(result=>{
//     console.log(result)
// });


// removeSameName();


//判断是否在betdiceuser表  如果不在 那么插入进去



//读取数据



// 进行单个转账





(async () => {
    let User=require("../model/godappuser");
    require("../db")
    let user1=new User({
        username:"godapp12122",
        assets:"0.0001 EOS",
        block_time:Date.now(),
        trx_id:"89c357ce1043c1cabc4a04ff5484ea49dbd789bc0729be8007a716163f3f17bb",
        memo:"godapp",
        created:Date.now()
    });

    let user2=new User({
        username:"zzzzz2zzzzzz",
        assets:"0.0001 EOS",
        block_time:Date.now(),
        trx_id:"89c357ce1043c1cabc4a04ff5484ea49dbd789bc0729be8007a716163f3f17bb",
        memo:"godapp",
        created:Date.now()
    });

    let user3=new User({
        username:"miaoman12345",
        assets:"0.0001 EOS",
        block_time:Date.now(),
        trx_id:"89c357ce1043c1cabc4a04ff5484ea49dbd789bc0729be8007a716163f3f17bb",
        memo:"godapp",
        created:Date.now()
    });
    let user4=new User({
        username:"dennis.e",
        assets:"0.0001 EOS",
        block_time:Date.now(),
        trx_id:"89c357ce1043c1cabc4a04ff5484ea49dbd789bc0729be8007a716163f3f17bb",
        memo:"godapp",
        created:Date.now()
    });
    let user5=new User({
        username:"zhangaccount",
        assets:"0.0001 EOS",
        block_time:Date.now(),
        trx_id:"89c357ce1043c1cabc4a04ff5484ea49dbd789bc0729be8007a716163f3f17bb",
        memo:"godapp",
        created:Date.now()
    });
    let user6=new User({
        username:"hicodemonkey",
        assets:"0.0001 EOS",
        block_time:Date.now(),
        trx_id:"89c357ce1043c1cabc4a04ff5484ea49dbd789bc0729be8007a716163f3f17bb",
        memo:"godapp",
        created:Date.now()
    });
    User.create(user5).catch(errmsg=>{console.log("error"+errmsg)});
    // User.create(user2).catch(errmsg=>{console.log("error"+errmsg)});
    // User.create(user3).catch(errmsg=>{console.log("error"+errmsg)});
    // User.create(user4).catch(errmsg=>{console.log("error"+errmsg)});
    // User.create(user6).catch(errmsg=>{console.log("error"+errmsg)});
})();

