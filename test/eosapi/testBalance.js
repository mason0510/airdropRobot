require('../../db/db')
test=async ()=>{
    let humanAis=await require("../../model/humanAI").find({});
    for (let i = 0; i <humanAis.length ; i++) {

        let balance=await require("../../eostools/accountInfo").robotBalance(humanAis[i].accountname);
        console.log("accountname:"+humanAis[i].accountname+"=========="+balance);
    }

};

test();
