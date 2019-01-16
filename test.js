//宏任务
setTimeout(() => {
    console.log('setTimeout1');
    //微任务
    Promise.resolve().then(data => {
        console.log('then3');
    });
},1000);

//微任务
Promise.resolve().then(data => {
    console.log('then1');
});
//微任务
Promise.resolve().then(data => {
    console.log('then2');
    setTimeout(() => {
        console.log('setTimeout2');
    },1000);
});

//先执行同步任务 异步任务
console.log(2);
