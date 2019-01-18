let fs = require('fs');
let readline = require('readline');
path=require('path');
readFileToArr=async (finename,callback)=>{
        let fRead = await fs.createReadStream(path.join(__dirname,finename));
        let objReadline = await readline.createInterface({
            input:fRead
        });
        let arr = new Array();
        objReadline.on('line',async function (line) {
           await arr.push(line);
           // console.log('line:'+ line);
        });
        objReadline.on('close',async function () {
            // console.log(arr);
           await callback(arr);
        });
};
module.exports={readFileToArr};

