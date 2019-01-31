

let sendbackmemo="sendback eos";
let robotdepositememo="robot,deposit";

let godappdepositememo="godapp,deposit";

let buyeosmemo="buyeos ";
let undelegatebwmemo="undelegatebw eos"
let url='https://proxy.eosnode.tools/v1/chain/get_account'
let betarea=["1","2","4"];
let baccarat_area = ["1", "2", "3","4","5"];
// let betnumber=[5000,10000,50000,100000];
// let arr=["0.5000 EOS","1.0000 EOS","5.0000 EOS","10.0000 EOS"];
let betnumber=[5000,10000,50000];
let arr=["0.5000 EOS","1.0000 EOS","5.0000 EOS"];
let url1="https://eos.greymass.com";
let url2="https://eu.eosdac.io";
let url3="https://proxy.eosnode.tools";
let url4="https://proxy.eosnode.tools/v1/chain/get_account";
let deadlineTime=10000;//整个请求的超时时间
let responseTime=10000;//设置等待第一个字节从服务器到达最大时间

let timeurl="http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp";

let gamestable = ['gametable', 'bets',"history","results"];
let code = ['godice.e', 'blackjack.e', 'warofstar.e',"baccarat.e"];
let scope = ['godice.e', 'blackjack.e', 'warofstar.e',"baccarat.e"];
let accountname = ["houseaccount", "godapp.e",'eosjoygame1b'];


let redblackRobot=['yiyiranranfc','xiaohuahuapa','crazydapp123','dappgoqqqqqq'
,'cochain54321','happylilyyyy','5jienibigwin','todayhappyww','ilovedappccc',
'btcgateraabb','51happydapps'];
//'miababyabcd',
let baccaratRobot=['baichuanwwww','dappmao12345','simplenieeee'
    ,'xihuanwan123','123tanchishe','dapp1234dapp','appleday2222','bananaday111',
    'melodymelody','eosvaecouves',"heaventohell"];

//system
let eosio='eosio.token';


//rent cpu账户 bankofstaked
let rent_cpu=["bankofstaked"];
let eos_quancity=["1.0000 EOS","0.2000 EOS","5.0000 EOS"];

//contracts
let contractAccount=["warofstar.e","baccarat.e"];

//没有玩家 0.1,(5%)
// 0.2,(5%)
// 0.3,（1%）
// 0.4,(2%)
// 0.5(13%)
// 0.8,(5%)
// 1,(20%)
// 1.6,（1%）
// 2,(10%)
// 3,（1%）
// 4,（1%）
// 5,（12%）
// 6,（1%）
// 8,(5%)
// 10,(5%)
// 15,（1%）
// 16,（1%）
// 20,(5%)
// 30,（1%）
// 32,（1%）
// 40,（1%）
// 48,（1%）
// 50（2%）

let bet_amount = ['0.1000 EOS','0.2000 EOS', '0.3000 EOS', '0.4000 EOS', '0.5000 EOS', '0.8000 EOS','1.0000 EOS','1.6000 EOS','2.0000 EOS','3.0000 EOS',
'4.0000 EOS','5.0000 EOS','6.0000 EOS','8.0000 EOS','10.0000 EOS','15.0000 EOS','16.0000 EOS',"20.0000 EOS",'30.0000 EOS',"32.0000 EOS",'40.0000 EOS',
"48.0000 EOS","50.0000 EOS"];

let bet_probability = [0.05,0.05, 0.01, 0.02, 0.13, 0.05,0.2,0.01,0.1,0.01,0.01,0.12,0.01,0.05,0.05,0.01,0.01,0.05,0.01,0.01,0.01,0.01,0.02];
//有玩家
let bet_probability_realPlayer = [0.28, 0.1, 0.2, 0.3, 0.12];


module.exports={godappdepositememo,robotdepositememo,bet_amount,bet_probability,timeurl,baccarat_area,rent_cpu,eos_quancity,contractAccount,sendbackmemo,url,betarea,betnumber,arr,undelegatebwmemo,buyeosmemo,url1,url2,url3,deadlineTime,responseTime,eosio,
gamestable,code,scope,accountname,redblackRobot,baccaratRobot,url4
};
