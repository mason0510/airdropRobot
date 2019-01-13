let rentcpu=()=>{
    return new Promise(resolve => {
        let request = require("request");
        let options = { method: 'POST',
            url: 'https://proxy.eosnode.tools/v1/chain/get_table_rows',
            body: { scope: "bankofstaked",code:"bankofstaked",table:"plan",json:true },
            json: true };

        request(options, async function (error, response, body) {
            if (error) {
                return
            }
              //  console.log(body)
                return resolve(body)
        });
    })


}
module.exports={rentcpu};
rentcpu();