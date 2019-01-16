let fs = require('fs');
path = require('path');

let waterfall = require('async-waterfall');
//waterfall(tasks, callback);

let save = async (count, newamount) => {
    waterfall([function (callback) {
        let data = fs.readFileSync(path.join(__dirname, 'sample'), 'utf-8');
        callback(null,data);
    },function (data,callback) {
        //表中的信息
        let betarr=data.split(',');
        let newbet=Number(newamount);
        console.log(newbet);
        let beforebet=Number(betarr[1]);
        console.log("betarr"+betarr[1]);
        console.log("=========="+typeof newbet+typeof beforebet);
        var bet=newbet+beforebet;
        console.log(bet);
        let content=count+','+bet;
        let result=fs.writeFileSync(path.join(__dirname,'sample'),content);
        //console.log("=========="+data);
        callback(null,result);
    }], function (err,result) {
        //result
        console.log(result);
    });

};
module.exports = {save};
//save(4,600);

