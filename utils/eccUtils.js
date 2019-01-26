let ecc=require("eosjs-ecc")
let arr=[]

let randomKey=()=>{ecc.randomKey().then(async privateKey => {
   console.log('Private Key:\t', privateKey) // wif
   console.log('Public Key:\t', ecc.privateToPublic(privateKey)) // EOSkey..
   return new Promise(async (resolve)=>{
       let publicKey = await ecc.privateToPublic(privateKey);
       resolve ([privateKey,publicKey])
   });
})}
// module.exports={pairkey}
arr=randomKey();
console.log("arr:",arr);

//查看公钥
contrast=()=>{
   async .waterfall([
       _function1(req),
       _function2,
       _function3
   ],(error,success)=>{
       if (error)console.error(error);
        return
   });
};

_function1=(req)=>{
    return function (callback) {
        let a=req.body;
        callback(null,a);
    }
};
_function2=(ite,req)=>{
    return function (callback) {
        let a=req.body;
        callback(null,a);
    }
};
_function3=(req)=>{
    return function (callback) {
        let a=req.body;
        callback(null,a);
    }
};


//对比

