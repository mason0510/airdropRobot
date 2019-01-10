let cryptoUtil=require("./cryptoUtil");
let str = cryptoUtil.publicEncrypt("张晓聪");//公钥加密
let deStr = cryptoUtil.privateDecrypt(str);//私钥解密

console.log("加密"+str);
console.log("解密"+deStr);