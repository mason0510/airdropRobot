let randANumber=async ()=>{
        const number=await Math.floor(Math.random()*11);
        return number;
};

let norepeatNumber=async (number)=>{
   let promise=new Promise(async (resolve,reject,err)=> {
       let result=[];
       for (let i = 0; i < number; i++) {
           result[i]=await Math.floor(Math.random()*11);
           for (let j = 0; j <i ; j++) {
               if (result[i]===result[j]){
                   i--;
               }
           }
       }
       resolve(result);
   });
    return promise;
};
module.exports={randANumber,norepeatNumber}

// let testRandom=async()=>{
//    let res= await randANumber();
//     console.log(res);
// }
// testRandom()

let test=async()=>{
let arr=await norepeatNumber(5);
for (let i = 0; i <arr.length ; i++) {
   console.log("=========="+arr[i]);
}
}
test()