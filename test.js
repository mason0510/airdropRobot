const express=require('express');
const app=express()
const port=3001;
app.get('/',(req,res)=>{
   res.send("helloworld");
});
app.listen(port,()=>{
    console.log(`${port}`);
});