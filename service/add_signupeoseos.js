//
//
// // 进行单个转账
// // require("../db");
// // let User=require("../model/godappuser");
// // const querystring = require('querystring');
//
// const https = require('https');
// let  count=0;
// const eosaccount=async ()=> {
//     count++;
//     let url="https://api.eospark.com/api?module=account&action=get_sub_account_info&apikey=a9564ebc3289b7a14551baf8ad5ec60a&account=signupeoseos&page="+count+"&size=10'"
//     let testurl="https://api.eospark.com/api?module=account&action=get_sub_account_info&apikey=a9564ebc3289b7a14551baf8ad5ec60a&account=signupeoseos&page=2&size=10";
//     https.get(url, (resp) => {
//         let data = '';
//
//         // A chunk of data has been recieved.
//         resp.on('data', (chunk) => {
//             data += chunk;
//             console.log("data"+data);
//         });
//
//         // The whole response has been received. Print out the result.
//         resp.on('end', () => {
//             console.log("当前第"+count+"次请求");
//             console.log(data);
//             let results = JSON.parse(data);
//             console.log(results.data.created_list)
//             // const res=results.data.created_list;
//             // if (res!=null) {
//             //     for (let i = 0; i < res.length; i++) {
//             //         console.log(count+"次账户是"+res[i]);
//             //     }
//             // }
//         });
//
//     }).on("error", (err) => {
//         console.log("Error: " + err.message);
//     });
// }
// //没秒钟获取一次
// const  myfunc=async ()=>{
//     await eosaccount("bid.game").catch(result=>{
//         //get info
//         console.log("异常情况"+result)
//     })
// }
//
// eosaccount();
//
// // setInterval(myfunc,2000,"Interval");
//
//
//
//
// // (async () => {
// //     //获取用户信息
// //
// //
// //     //获取用户信息
// //     // let user1=new User({
// //     //     username:"godapp12122",
// //     //     assets:"0.0000 EOS",
// //     //     block_time:"",
// //     //     trx_id:"",
// //     //     memo:"",
// //     //     created:Date.now()
// //     // });
// //     // let res= await User.findOne({username:from}).catch();
// //     //     if(!res){
// //     //         //may not be in mongodb 账户名 资产 创建时间
// //     //         await User.create(user).catch(errmsg=>{console.log("error"+errmsg)});
// //     //         console.log("保存成功")
// //     //     }
// //
// //     // User.create(user2).catch(errmsg=>{console.log("error"+errmsg)});
// //     // User.create(user3).catch(errmsg=>{console.log("error"+errmsg)});
// //     // User.create(user4).catch(errmsg=>{console.log("error"+errmsg)});
// //     // User.create(user6).catch(errmsg=>{console.log("error"+errmsg)});
// // })();
//

// const request = require('request');
//
// request('https://api.eospark.com/api?module=account&action=get_sub_account_info&apikey=a9564ebc3289b7a14551baf8ad5ec60a&account=signupeoseos&page=2&size=10', { json: true }, (err, res, body) => {
//     if (err) { return console.log(err); }
//     console.log(Json.pabody.url);
//     console.log(body.explanation);
// });

// const axios = require('axios');
//
// axios.get('https://api.eospark.com/api?module=account&action=get_sub_account_info&apikey=a9564ebc3289b7a14551baf8ad5ec60a&account=signupeoseos&page=2&size=10')
//     .then(response => {
//         //获取到了解析数据
//         console.log(response.data);
//         for (let i = 0; i < response.data.created_list.length; i++) {
//                     console.log(count+"次账户是"+response.data.created_list[i]);
//                 }
//     })
//     .catch(error => {
//         console.log(error);
//     });

    require("../db/db")
    let User=require("../model/godappuser");
    let count=0;
    const superagent = require('superagent');
  //  let url="https://api.eospark.com/api?module=account&action=get_sub_account_info&apikey=a9564ebc3289b7a14551baf8ad5ec60a&account=signupeoseos&page="+count+"&size=10'"
    //let testurl="https://api.eospark.com/api?module=account&action=get_sub_account_info&apikey=a9564ebc3289b7a14551baf8ad5ec60a&account=signupeoseos&page=2&size=10";

for (let i = 0; i <15000 ; i++) {
    setTimeout(async ()=> {
        count++;
        console.log("总第" + count + "次请求")
        await superagent.get("https://api.eospark.com/api")
            .query({
                module:"account",
                action:"get_sub_account_info",
                apikey:"a9564ebc3289b7a14551baf8ad5ec60a",
                account:"signupeoseos",
                page:count,
                seNewUrlParser: true,
                size:20
            })
            .end(async (err, res) => {
                if (err) { return console.log(err); }
                //保存数据库
              await res.body.data.created_list.forEach(async user=>{
                    let walletuser=new User({
                        username:user.account,
                        assets:"0.0000 EOS",
                        block_time:"",
                        trx_id:"",
                        memo:"",
                        created:Date.now()
                    });

                    let res= await User.findOne({username:user.account}).catch(result=>{console.log(result);});
                    if(!res){
                        //may not be in mongodb 账户名 资产 创建时间
                        count++;
                        console.log("保存成功");
                        await User.create(walletuser).catch(errmsg=>{console.log("error"+errmsg)});
                    }
                })
                done();
            }).catch(result=>{console.log(result);});
    }, i * 100);
}




