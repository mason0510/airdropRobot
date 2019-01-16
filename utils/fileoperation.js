let fs = require('fs');
path = require('path');

let waterfall = require('async-waterfall');
//waterfall(tasks, callback);

let save = async (count, newamount) => {
    console.log("newacount:"+newamount);
    waterfall([async function (callback) {
        try {
            let data =await fs.readFile(path.join(__dirname,'sample'),async function (err,data) {
                console.log("data:"+data);//12 null
                await callback(null,data);
               // console.log("data[0]:"+data[0]);
               // console.log("data[1]:"+data[1]);
            } );
        }catch (e) {
            console.log(e);
        }
    },async function (data,callback) {
        //表中的信息
        let betarr=await data.toString().split(',');
        console.log("betarr"+betarr);
        let newbet=Number(newamount);
        console.log("newamount:"+newbet);
        let beforebet=Number(betarr[1]);
        console.log("betarr"+betarr[1]);
        console.log("=========="+typeof newbet+typeof beforebet);
        let bet=newbet+beforebet;
        console.log("bet:"+bet);
        let content=count+','+bet;
        console.log("content:"+content);
        let result=await fs.writeFileSync(path.join(__dirname,'sample'),content);
        //console.log("=========="+data);
        await callback(null,result);
    }], function (err,result) {
        if (err)console.log(err); 
        //result
        console.log(result);
        let data = fs.readFileSync(path.join(__dirname,'sample'), 'utf-8');
        console.log(data)
    });

};
let saveBetData = async (count, newamount) => {
    console.log("newacount:"+newamount);
    waterfall([async function (callback) {
        let result=await fs.writeFileSync(path.join(__dirname,'betData'),count+","+newamount);
        //console.log("=========="+data);
        await callback(null,result);
    }], function (err,result) {
        if (err)console.log(err);
        //result
        console.log(result);
        let data = fs.readFileSync(path.join(__dirname,'betData'), 'utf-8');
        console.log(data)
    });

};
module.exports = {save,saveBetData};
// save(3,30);

