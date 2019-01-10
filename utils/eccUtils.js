let ecc=require("eosjs-ecc")

pairkey=ecc.randomKey().then(async privateKey => {
   // console.log('Private Key:\t', privateKey) // wif
   // console.log('Public Key:\t', ecc.privateToPublic(privateKey)) // EOSkey...
    let publicKey = await ecc.privateToPublic(privateKey);
    return [privateKey,publicKey]
})
module.exports={pairkey}