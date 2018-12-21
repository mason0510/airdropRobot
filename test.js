let Ut = require("./utils/common");

(async () => {
    console.log("开始");
    // let t1 = +new Date();
    // console.time("总延迟");
    //
    // console.time("第一次延迟");
    await Ut.sleep(10000);
    // console.timeEnd("第一次延迟");
    //
    // console.time("第二次延迟");
    // await Ut.sleep(4000);
    // console.timeEnd("第二次延迟");
    //
    // console.timeEnd("总延迟");
    // let t2 = +new Date();
    // console.log(t2 - t1);
    console.log("结束");
})()
