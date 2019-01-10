// const request = require('request')
//
// request.post('https://flaviocopes.com/todos', {
//     json: {
//         todo: 'Buy the milk'
//     }
// }, (error, res, body) => {
//     if (error) {
//         console.error(error)
//         return
//     }
//     console.log(`statusCode: ${res.statusCode}`)
//     console.log(body)
// })


// console.log(100000/10000.0000+" EOS");
let betarea=["1","2","4"];
let betnumber=[5000,10000,50000];
let aa=async ()=>{
    let money=await betnumber[Math.floor(Math.random()*betnumber.length)]
    let area=await betarea[Math.floor(Math.random()*betarea.length)]
    let memo=2018+","+"zhangaccount"+","+area+","+money;
    console.log(memo);
}

aa()
