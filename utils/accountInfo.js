require("../db/db")

let AirUser=require("../model/eosAccount");

let  query=async (index)=>{
    let results= await AirUser.find({});
    return results[index].accountname;
}

module.exports={query}