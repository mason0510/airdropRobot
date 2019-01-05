

require("../db")
let User=require("../model/allusers");
let count=0;
const superagent = require('superagent');
//  let url="https://api.eospark.com/api?module=account&action=get_sub_account_info&apikey=a9564ebc3289b7a14551baf8ad5ec60a&account=signupeoseos&page="+count+"&size=10'"
//let testurl="https://api.eospark.com/api?module=account&action=get_sub_account_info&apikey=a9564ebc3289b7a14551baf8ad5ec60a&account=signupeoseos&page=2&size=10";

for (let i = 0; i <1 ; i++) {
    setTimeout(async ()=> {
        count++;
        console.log("总第" + count + "次请求")
                    let walletuser=new User({
                        b1: "zhangaccount",
                        0x00000000000000000000000000000000000000b1: "aaa",
                        EOS5cujNHGMYZZ2tgByyNEUaoPLFhZVmGXbZc9BLJeQkKZFqGYEiQ:"bbb",
                        100000000:[{0100 :"100 EOS"}]
                    });

                    let res= await User.findOne({b1:"zhangaccount"}).catch(result=>{console.log(result);});
                    if(!res){
                        //may not be in mongodb 账户名 资产 创建时间
                        count++;
                        console.log("保存成功");
                        await User.create(walletuser).catch(errmsg=>{console.log("error"+errmsg)});
                    }
                })
}




