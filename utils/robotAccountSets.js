require('../utils/dbutils');
let humanais = require("../model/humanAI");
let robotname=async ()=>{
   let promise=new Promise(async resolve=>{
       let newarr = [];
       let res = await humanais.find({}).limit(11);
       for (let i = 0; i < res.length; i++) {
           let name = await res[i].accountname;
           await newarr.push(name);
           //console.log(newarr[i]);
           resolve(newarr);
       }
   });
    return promise;
};

module.exports={robotname};