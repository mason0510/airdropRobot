let request= require('request');
//获取当前的轮次
getGameTable=async ()=>{
    // console.log("==============");
    let promise=new Promise(async resolve => {
        await request.post('https://proxy.eosnode.tools/v1/chain/get_table_rows', {
            json: {
                code: 'warofstar.e',
                table:"gametable",
                scope:"warofstar.e",
                json:true
            }
        }, async (error, res, body) => {
            if (error) {
                console.error(error)
                return
            }
            console.log(`statusCode: ${res.statusCode}`);
           // let gamestatus =await body.rows[0].status;
           // let end_time=await body.rows[0].end_time;
           // let roundId=await body.rows[0].id;
            return resolve(body);
        })
    });
    return promise;
};

getPlayerTable=async ()=>{
    // console.log("==============");
    let promise=new Promise(async resolve => {
        await request.post('https://proxy.eosnode.tools/v1/chain/get_table_rows', {
            json: {
                code: 'warofstar.e',
                table:"gametable",
                scope:"warofstar.e",
                json:true
            }
        }, async (error, res, body) => {
            if (error) {
                console.error(error)
                return
            }
            console.log(`statusCode: ${res.statusCode}`);
            // let gamestatus =await body.rows[0].status;
            // let end_time=await body.rows[0].end_time;
            // let roundId=await body.rows[0].id;
            return resolve(body);
        })
    });
    return promise;
};


module.exports={getGameTable,getPlayerTable};

// let body=async()=>{
//     let body=await getGameStatus();
//     console.log("==========="+body)
// }
// body()