let request=require("request");
require('../db/db');
let HumanAis=require('../model/humanAI');
_checkHouseAccount=async(accountname)=>{
    return new Promise(async (resolve, reject) => {
        console.log("begin");
        let options = { method: 'POST',
            url: 'https://proxy.eosnode.tools/v1/chain/get_account',
            body: { account_name: accountname},
            json: true };

        await request(options, async  (error, response, body) =>{
            if (error) {
               return;
            }
            let zz=await parseInt(body.core_liquid_balance,0);
            if (zz-1000>0){
                let amount=String(zz-1000)+".0000 EOS";
                let publichkey=body.permissions[0].required_auth.keys[0].key
                // await reimbursement("houseaccount","godapp.e",mykey,amount,constants.sendbackmemo)
                console.log(accountname+"========================================"+body.core_liquid_balance+"=========="+amount);
                return resolve(body);
            }
        });
    });
};
_accountInfo=async(accountname)=>{
    return new Promise(async (resolve, reject) => {
        console.log("begin");
        let options = { method: 'POST',
            url: 'https://proxy.eosnode.tools/v1/chain/get_account',
            body: { account_name: accountname},
            json: true };

        await request(options, async  (error, response, body) =>{
            if (error) {
                console.log(error);
                return;
            }
            console.log(body);
                return resolve(body);
        });
    });
};



module.exports={_checkHouseAccount,_accountInfo};


test=async ()=>{
    let humanAis=await HumanAis.find({});
    for (let i = 0; i <humanAis.length ; i++) {
        console.log(humanAis[i].accountname);
        await _accountInfo(humanAis[i].accountname);
    }

};

// test();



