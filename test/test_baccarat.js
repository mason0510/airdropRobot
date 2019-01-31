//返回全部数据
let arr=[]
let test=async ()=>{
    let arrss=await Internal.get_beforeDb();
    // console.log("ss================="+typeof arrss);
    arr=await arrss.split(',');
    // console.log("ss================="+typeof arr);
    start(arr);
}
test();