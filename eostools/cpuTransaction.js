let request = require("request");
let querycpuPrice = async () => {
    return new Promise(async resolve => {
        let options = {
            method: 'POST',
            url: 'https://proxy.eosnode.tools/v1/chain/get_table_rows',
            body: {scope: "bankofstaked", code: "bankofstaked", table: "plan", json: true},
            json: true
        };

       await request(options, async function (error, response, body) {
            if (error) {
                return
            }
       console.log(body);
            return resolve(body)
        })
    })
};
//transfer for cpu 7天
getAccounts= async ()=>{
    if (accounts.length === 0){
        let results= await AirUser.find({});
        return results;
    }else {
        console.log("accounts");
        return accounts;
    }
}



rent_transfer=async ()=>{
    console.log("rent");
    let results=await getAccounts();
    for (let i = 0; i <results.length ; i++) {
        setTimeout(async () =>{
            await _airdrop(results[i].username,memo)
            await _airdrop(results[i],memo)
            count++;
            console.log("当前空投账户"+results[i].username+"总第"+count+"次转账");
        }, i * 1000);
    }
    console.log("airdrop finished");
};

_airdrop=async (account,memo)=>{
    if(!account){
        return false
    }
    console.log("airdrop to",account);
    let mykey = await dbutils.mykey("godapp.e")
    try {
        await Eoshelper.api.myFunc(mykey).transact({
            actions: [{
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                    actor: 'godapp.e',
                    permission: 'active',
                }],
                data: {
                    from: 'godapp.e',
                    to: account,
                    quantity: '0.0001 EOS',
                    memo: memo,
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });

        await markDropped(account)
        return false;
    }catch (e) {
        console.log(e);
        return false;
    }
    return true;

};



// let transfer=async ()=>{
//   await
// };








module.exports = {querycpuPrice};

querycpuPrice();