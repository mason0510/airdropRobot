let sendbackmemo = "sendback eos"
let buyeosmemo = "buyeos "
let undelegatebwmemo = "undelegatebw eos"
let url = 'https://proxy.eosnode.tools/v1/chain/get_account'
let betarea = ["1", "2", "4"];
// let betnumber=[5000,10000,50000,100000];
// let arr=["0.5000 EOS","1.0000 EOS","5.0000 EOS","10.0000 EOS"];
let betnumber = [5000, 10000, 50000];
let arr = ["0.5000 EOS", "1.0000 EOS", "5.0000 EOS"];
let url1 = "https://eos.greymass.com";
let url2 = "https://eu.eosdac.io";
let url3 = "https://proxy.eosnode.tools";
let deadlineTime = 1000000;//
// 整个请求的超时时间 
let responseTime = 5000;//设置等待第一个字节从服务器到达最大时间 
let gamestable = ['gametable', 'bets'];
let code = ['godice.e', 'blackjack.e', 'warofstar.e'];
let scope = ['godice.e', 'blackjack.e', 'warofstar.e'];
let accountname = ["houseaccount", "godapp.e"];
//system 
let eosio='eosio.token';
  module.exports={sendbackmemo,url,betarea,betnumber,arr,undelegatebwmemo,buyeosmemo,url1,url2,url3,deadlineTime,responseTime,eosio, gamestable,code,scope,accountname };



//module.exports = {sendbackmemo, url, betarea, betnumber, arr, undelegatebwmemo, buyeosmemo, url1, url2, url3};