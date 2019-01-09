//早期采用对称加密 使用同一种规则解密 双方必须统一规则





//非对称加密 公钥公开 私钥保密 长度超过768位的密钥 至今无人破解

// let esdsa=()=>{
//     const sig = new Signature({ alg: 'SHA256withECDSA' });
//     sig.init(KEYUTIL.getKey(key));
//     sig.updateHex(dataBuffer.toString('hex'));
//     const asn1hexSig = sig.sign();
//     const concatSig = ECDSA.asn1SigToConcatSig(asn1hexSig);
//     return new Buffer(concatSig, 'hex');
// }
// esdsa()
const asn1 = require('asn1.js');
const BN = require('bn.js');
const crypto = require('crypto');

const EcdsaDerSig = asn1.define('ECPrivateKey', function() {
    return this.seq().obj(
        this.key('r').int(),
        this.key('s').int()
    );
});

function asn1SigSigToConcatSig(asn1SigBuffer) {
    const rsSig = EcdsaDerSig.decode(asn1SigBuffer, 'der');
    return Buffer.concat([
        rsSig.r.toArrayLike(Buffer, 'be', 32),
        rsSig.s.toArrayLike(Buffer, 'be', 32)
    ]);
}

function concatSigToAsn1SigSig(concatSigBuffer) {
    const r = new BN(concatSigBuffer.slice(0, 32).toString('hex'), 16, 'be');
    const s = new BN(concatSigBuffer.slice(32).toString('hex'), 16, 'be');
    return EcdsaDerSig.encode({r, s}, 'der');
}

function ecdsaSign(hashBuffer, key) {
    const sign = crypto.createSign('sha256');
    sign.update(asBuffer(hashBuffer));
    const asn1SigBuffer = sign.sign(key, 'buffer');
    return asn1SigSigToConcatSig(asn1SigBuffer);
}

function ecdsaVerify(data, signature, key) {
    const verify = crypto.createVerify('SHA256');
    verify.update(data);
    const asn1sig = concatSigToAsn1Sig(signature);
    return verify.verify(key, new Buffer(asn1sig, 'hex'));
}