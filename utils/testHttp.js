// this.checkCodeUrl = 'https://www.test.com/kaptcha.jsp';
// var https = require('https');
// https.get(this.checkCodeUrl,function(res){
//     var datas = [];
//     var size = 0;
//     res.on('data', function(data){
//         datas.push(data);
//         size += data.length;
//     })
//     res.on('end', function(data){
//         var buff = Buffer.concat(datas, size);
//         var pic = buff.toString('base64');
//         callback({success:true, data:pic});
//     })
// }).on('error',function(err){
//     console.log('获取验证码异常,异常原因'+err);
//     callback({success:false, msg:'获取验证码失败'});
// })
//
//
// // var https = require('https');
// // var iconv = require('iconv-lite');
// // var querystring = require("querystring");
// // var reqData = {
// //     str1:'11',
// //     str2:'22'
// // }
// // var postData = querystring.stringify(reqData);
// // var opts = {
// //     method:'POST',
// //     host:'www.test.com',
// //     port:'443',
// //     path:'/api/test',
// //     headers:{
// //         'Content-Type':'application/x-www-form-urlencoded',
// //         'Content-Length':postData.length
// //     }
// // }
// // var req = https.request(opts,function(res){
// //     var datas = [];
// //     var size = 0;
// //     res.on('data',function(data){
// //         datas.push(data);
// //         size += data.length;
// //     })
// //     res.on('end', function(){
// //         var buff = Buffer.concat(datas, size);
// //         var str = iconv.decode(buff,'gbk');
// //         callback({success:true, data:str});
// //     })
// // })
// // req.on('error',function(err){
// //     console.log('异常,异常原因'+err);
// //     callback({success:false, msg:'失败'});
// // })
// // req.write(postData);



