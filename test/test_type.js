// var json = {
//     a : ' 1 ',
//     b : ' 2'
// };
// var str = JSON.stringify(json);
// console.log(typeof str);
let Internal = require('../db/internal');
let aa=async ()=>{

    let str= await Internal.fetch_playerInfos();
    let playerInfos=JSON.parse(str);
    console.log(playerInfos['rows']);
    for (let i = 0; i < playerInfos['rows'].length; i++) {
        let roundply =  playerInfos['rows'][i].player;
        console.log(roundply);
    }
}
aa()
// let json = JSON.parse(str);
// console.log(typeof json);
// console.log(json['colour']);
// // console.log(json.powerlocks);


// var temp = "";
// for(let i in json){//用javascript的for/in循环遍历对象的属性
//     console.log(json[i]);
// }
// console.log(temp);