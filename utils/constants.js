let sendbackmemo="sendback eos";
let depositememo="deposit";
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
let deadlineTime=1000000;//整个请求的超时时间
let responseTime=5000;//设置等待第一个字节从服务器到达最大时间

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
let eos_quancity=["1.0000 EOS"];

//contracts
let contractAccount=["warofstar.e","baccarat.e"];

module.exports={timeurl,baccarat_area,rent_cpu,eos_quancity,contractAccount,sendbackmemo,url,betarea,betnumber,arr,undelegatebwmemo,buyeosmemo,url1,url2,url3,deadlineTime,responseTime,eosio,
gamestable,code,scope,accountname,depositememo,redblackRobot,baccaratRobot
};