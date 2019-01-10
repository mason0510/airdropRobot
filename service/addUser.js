//服务器 https://betdice.one/dice/prod/api/contest/3/1545206400/EOS/
//设置配置 获取表实例 let User=require("../model/betdiceUser");
// require("../db")
require("../db/db")
let User=require("../model/companyAccount");
let cryptoUtil=require("../encryption/cryptoUtil");

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








(async () => {
    //加密godapp.e
    //EOS8V2AxLbKadtV29cP1jD5YFp5DRQt4JET5PYKUoxdB6NZ8sPyt6
   let key_a="5JgWbqPFygNyurb888NcjpLAtZEyW5cLvMDQ8586EhisrCusxBD"
    //godice.e   EOS75PYGxeyi9jXtLVAfsNFjUPmQSLiKpFzV3gKgbcUJE7bzzx9X4
    let key_b="5JPFHxRL7wLmWJFGaWKK2nSABxRHkajyzv3AuLCZmwjtuAZz5ji"
    //blackjack.e  EOS6tCywei9AmE6Q5EmAxYrdY52oL9V9h8u7iernhByp1fUqLRbDE
    let key_c="5KCjMHjyZArWGNXv9Q55vNGkYJobE7Fetv4wQMSainQBdBiGkY2"
    //warofstar.e EOS7KyMhGEaFVB6xXPzrGhgnVP3CbwqfHxLufbWWLhqYZLymGASZp
    let key_d="5J52McQ6bQjGxABiaVv3WfU72WZDk5C4Vp8VcSEFB752AC3cH1K"
    //eosluckcoin1
    let key_e="5KNf32JrmzQHdvvVU62FvSR8HxDHfaceqBSQxvmp5eQiw4yQNNr"

    // 加密
    let key1=cryptoUtil.publicEncrypt(key_a);
    let key2=cryptoUtil.publicEncrypt(key_b);
    let key3=cryptoUtil.publicEncrypt(key_c);
    let key4=cryptoUtil.publicEncrypt(key_d);
    let key5=cryptoUtil.publicEncrypt(key_e);


    
    let user1=new User({
        accountname: "godapp.e",
        privatekey:key1,
        publickey: "EOS8V2AxLbKadtV29cP1jD5YFp5DRQt4JET5PYKUoxdB6NZ8sPyt6",
        net_limit: { used: 0, available: 0, max: 0},
        cpu_limit: { used:0, available: 0, max: 0 },
        ram_usage: 0,
        assets: "0",
        network:"MainNet"
    });


    let user2=new User({
        accountname: "godice.e",
        privatekey:key2,
        publickey: "EOS75PYGxeyi9jXtLVAfsNFjUPmQSLiKpFzV3gKgbcUJE7bzzx9X4",
        net_limit: { used: 0, available: 0, max: 0},
        cpu_limit: { used:0, available: 0, max: 0 },
        ram_usage: 0,
        assets: "0",
        network:"MainNet"
    });
    let user3=new User({
        accountname: "blackjack.e",
        privatekey:key3,
        publickey: "EOS6tCywei9AmE6Q5EmAxYrdY52oL9V9h8u7iernhByp1fUqLRbDE",
        net_limit: { used: 0, available: 0, max: 0},
        cpu_limit: { used:0, available: 0, max: 0 },
        ram_usage: 0,
        assets: "0",
        network:"MainNet"
    });
    let user4=new User({
        accountname: "godappredbla",
        privatekey:key4,
        publickey: "EOS7KyMhGEaFVB6xXPzrGhgnVP3CbwqfHxLufbWWLhqYZLymGASZp",
        net_limit: { used: 0, available: 0, max: 0},
        cpu_limit: { used:0, available: 0, max: 0 },
        ram_usage: 0,
        assets: "0",
        network:"MainNet"
    });
    let user5=new User({
        accountname: "eosluckcoin1",
        privatekey:key5,
        publickey: "EOS8M7A5hqsEnZxqXuSSwja7BvWsALEDVd8PceGgkvbqJ23CKNyRt",
        net_limit: { used: 0, available: 0, max: 0},
        cpu_limit: { used:0, available: 0, max: 0 },
        ram_usage: 0,
        assets: "0",
        network:"MainNet"
    });

    User.create(user1).catch(errmsg=>{console.log("error"+errmsg)});
    User.create(user2).catch(errmsg=>{console.log("error"+errmsg)});
    User.create(user3).catch(errmsg=>{console.log("error"+errmsg)});
    User.create(user4).catch(errmsg=>{console.log("error"+errmsg)});
    User.create(user5).catch(errmsg=>{console.log("error"+errmsg)});
})();

