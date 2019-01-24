module.exports=async (req,res,next)=>{
  res.success=(data=null)=>{
      res.send({
          code:0,
          msg: "success",
          data:data
      })
      res.fail=async msg=>{
          res.send({
              code:-1,
              msg:msg
          })
      }
  }  ;
  next();
};