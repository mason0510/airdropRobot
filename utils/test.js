let a=async ()=>{
    let dbutils =await require("./dbutils");
    let mykey = await dbutils.mykey("godice.e")
    console.log(mykey);

}
a()
