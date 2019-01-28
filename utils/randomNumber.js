let randANumber=async ()=>{
        const number=await Math.floor(Math.random()*11);
        return number;
};

let norepeatNumber=async (number)=>{
   let promise=new Promise(async (resolve,reject,err)=> {
       let result=[];
       for (let i = 0; i < number; i++) {
<<<<<<< HEAD
           result[i]=await Math.floor(Math.random()*125);
=======
           result[i]=await Math.floor(Math.random()*9);
>>>>>>> a84cf316b21b6c76e9ad87260427f71699186a69
           for (let j = 0; j <i ; j++) {
               if (result[i]===result[j]){
                   i--;
               }
           }
       }
       // console.log("=========="+result);
       resolve(result);
   });
    return promise;
};
let _norepeatNumber=async (number)=>{
    let promise=new Promise(async (resolve,reject,err)=> {
        let result=[];
        for (let i = 0; i < number; i++) {
<<<<<<< HEAD
            result[i]=await Math.floor(Math.random()*62);
=======
            result[i]=await Math.floor(Math.random()*33);
>>>>>>> a84cf316b21b6c76e9ad87260427f71699186a69
            for (let j = 0; j <i ; j++) {
                if (result[i]===result[j]){
                    i--;
                }
            }
        }
<<<<<<< HEAD
=======
        // console.log("=========="+result);
>>>>>>> a84cf316b21b6c76e9ad87260427f71699186a69
        resolve(result);
    });
    return promise;
};
let random_different_probability=(arr1, arr2)=> {
    let sum = 0,
        factor = 0,
        random = Math.random();

    for(let i = arr2.length - 1; i >= 0; i--) {
        sum += arr2[i]; // 统计概率总和
    };
    random *= sum; // 生成概率随机数
    for(let i = arr2.length - 1; i >= 0; i--) {
        factor += arr2[i];
        if(random <= factor)
            return arr1[i];
    };
    return null;
};


module.exports={_norepeatNumber,randANumber,norepeatNumber,random_different_probability}

// let testRandom=async()=>{
//    let res= await randANumber();
//     console.log(res);
// }
// testRandom()

// let robot=async()=>{
// let arr=await norepeatNumber(5);
// for (let i = 0; i <arr.length ; i++) {
//    console.log("=========="+arr[i]);
// }
// }
// robot()
// norepeatNumber(9)