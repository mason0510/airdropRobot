// let count=1; //0 zz   1 aa   2 mm  23
//每隔一个小时执行一次
require('../db/db');
let IntervalTime=require('../model/intervalTime');

let RobotAccountConstants=require('../utils/robotAccountConstants');
let Internal=require('../db/internal');
let Time=require('../utils/time');
// let begin_time=1548410303;
// let count
let arr=RobotAccountConstants.arr1;
let internalTime;
task = async (i) => {
    //首次执行 从redis 读取当前count
    let begin_time = await Internal.get_beginTime();
    console.log("begin_time:"+begin_time);
    // console.log(begin_time + "=========确认是对的===========" + i);
    let nowTime = await Time.nowTime();
    internalTime = nowTime - parseInt(begin_time);
    // internalTime = parseInt(networkTime / 1000) - parseInt(begin_time);
    console.log("internalTime:======================================================", internalTime);

    if (internalTime >= 3600) {
        let arr1=[];
        i++;
        let nowTime = await Time.nowTime();
        console.log("nowTime:"+nowTime);
        await Internal.set_beginTime(nowTime);
        await Internal.set_count(i);
        if (i >= 24) {
            arr=RobotAccountConstants.arr24;
            await Internal.set_count(1);
            return arr;
        }
        else {
            console.log("一小时之后的i========="+i);
            // if (i===1){
            //     arr1=RobotAccountConstants.arr1;return arr1;
            // }
            if (i===2){
                arr1=RobotAccountConstants.arr2; console.log("arr:"+arr1);return arr1;
            }
            if (i===3){
                arr1=RobotAccountConstants.arr3; console.log("arr:"+arr1);return arr1;
            }
            if (i===4){
                arr1=RobotAccountConstants.arr4; console.log("arr:"+arr1);return arr1;
            }
            if (i===5){
                arr1=RobotAccountConstants.arr5; console.log("arr:"+arr1);return arr1;
            }
            if (i===6){
                arr1=RobotAccountConstants.arr6; console.log("arr:"+arr1);
                return arr1;
            }
            if (i===7){
                arr1=RobotAccountConstants.arr7; console.log("arr:"+arr1);return arr1;
            }
            if (i===8){
                arr1=RobotAccountConstants.arr8; console.log("arr:"+arr1);return arr1;
            }
            if (i===9){
                arr1=RobotAccountConstants.arr9; console.log("arr:"+arr1);return arr1;
            }
            if (i===10){
                arr1 = RobotAccountConstants.arr10; console.log("arr:"+arr1);return arr1;
            }
            if (i===11){
                console.log("i:"+i);
                console.log("RobotAccountConstants.arr11:"+RobotAccountConstants.arr11);
                //console.log("arr:"+arr);
                arr1=RobotAccountConstants.arr11;
                console.log("arr:"+arr1);
                return arr1;
            }
            if (i===12){
                arr1=RobotAccountConstants.arr12;return arr1;
            }
            if (i===13){
                arr1=RobotAccountConstants.arr13;return arr1;
            }
            if (i===14){
                arr1=RobotAccountConstants.arr14;return arr1;
            }
            if (i===15){
                arr1=RobotAccountConstants.arr15;return arr1;
            }
            if (i===16){
                arr1=RobotAccountConstants.arr16;return arr1;
            }
            if (i===17){
                arr1=RobotAccountConstants.arr17;return arr1;
            }
            if (i===18){
                arr1=RobotAccountConstants.arr18;return arr1;
            }
            if (i===19){
                arr1=RobotAccountConstants.arr19;return arr1;
            }
            if (i===20){
                //首次执行
                arr1=RobotAccountConstants.arr20;return arr1;
            }
            if (i===21){
                arr1=RobotAccountConstants.arr21;return arr1;
            }
            if (i===22){
                arr1=RobotAccountConstants.arr22;return arr1;
            }
            if (i===23){
                arr1=RobotAccountConstants.arr23;return arr1;
            }else {
                //默认值
                arr1=RobotAccountConstants.arr23;
            }
            // console.log("arr1:"+i+"i"+"=========="+arr1);
            return arr1;
        }
    }else {
        console.log("==========================i"+i);
        let arr2=[];
        // if (i===1){
        //     arr2=RobotAccountConstants.arr1;return arr2;
        // }
        if (i===2){
            arr2=RobotAccountConstants.arr2;return arr2;
        }
        if (i===3){
            arr2=RobotAccountConstants.arr3;return arr2;
        }
        if (i===4){
            arr2=RobotAccountConstants.arr4;return arr2;
        }
        if (i===5){
            arr2=RobotAccountConstants.arr5;return arr2;
        }
        if (i===6){
            arr2=RobotAccountConstants.arr6;return arr2;
        }
        if (i===7){
            arr2=RobotAccountConstants.arr7;return arr2;
        }
        if (i===8){
            arr2=RobotAccountConstants.arr8;return arr2;
        }
        if (i===9){
            arr2=RobotAccountConstants.arr9;return arr2;
        }
        if (i===10){
            arr2 = RobotAccountConstants.arr10;return arr2;
        }
        if (i===11){
            arr2=RobotAccountConstants.arr11;return arr2;
        }
        if (i===12){
            arr2=RobotAccountConstants.arr12;return arr2;
        }
        if (i===13){
            arr2=RobotAccountConstants.arr13;return arr2;
        }
        if (i===14){
            arr2=RobotAccountConstants.arr14;return arr2;
        }
        if (i===15){
            arr2=RobotAccountConstants.arr15;return arr2;
        }
        if (i===16){
            arr2=RobotAccountConstants.arr16;return arr2;
        }
        if (i===17){
            arr2=RobotAccountConstants.arr17;return arr2;
        }
        if (i===18){
            arr2=RobotAccountConstants.arr18;return arr2;
        }
        if (i===19){
            arr2=RobotAccountConstants.arr19;return arr2;
        }
        if (i===20){
            //首次执行
            arr2=RobotAccountConstants.arr20;return arr2;
        }
        if (i===21){
            arr2=RobotAccountConstants.arr21;return arr2;
        }
        if (i===22){
            arr2=RobotAccountConstants.arr22;return arr2;
        }
        if (i===23){
            arr2=RobotAccountConstants.arr23;
            return arr2;
        }else {
            //默认值
            arr2=RobotAccountConstants.arr23;
        }
        return arr2
    }
    console.log("arr:========================================"+"i"+i+"=========="+arr);
    return arr
};
/**
 * 开始时间 单位s
 * @param begin_time
 */
let getRobotAccounts = async (number) => {
    //获取账户 shengbo
    if (number > 24) {
        arr=RobotAccountConstants.arr24;
        await Internal.set_count(1);
        return await task(1);
    }else {
        return await task(number);
    }
};
module.exports={getRobotAccounts};

// getRobotAccounts(100);


