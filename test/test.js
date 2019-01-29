//测试所有的东西
let Constants=require('../utils/constants');
let smnum=0;
let arr3=[];
let sum=()=>{
    let arr=Constants.bet_probability;
    let arr2=Constants.bet_amount;
    // arr2.forEach(item=>{
    //     console.log("=========="+item);
    // })
    for (let i = 0; i < arr.length; i++) {
        smnum+=arr[i];
         arr3.push(arr2[i]+"="+arr[i])
    }
    console.log(smnum.toFixed());
    console.log(arr3);
};
sum();