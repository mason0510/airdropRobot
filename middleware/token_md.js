let crypto = require('lxj-crypto');
let config = require('../config/configdb')
let accountService = require('../service/accountservice')
let isExcludeUrl = require('../util/token_util');

function isExcludeCheckReq(req) {
    // 不需要token的url
    let urls = [
        /.*\/user\/login/,
        /.*\/user\/register/
    ];
    let result = false;
    for (let i = 0; i < urls.length; i++) {
        let urlReg = urls[i];
        if(urlReg.test(req.url)){
            result = true;
            break;
        }
    }

    return result
}

module.exports = async function (req, res, next) {
    if (!isExcludeCheckReq(req.url)) {

        //检查有没有token
        let token = req.get('token') || null;
        if (!token) {
            throw Error("缺少token")
        }

        let tokenData = null;
        try {
            //解码token, 检查token是否过期
            tokenData = JSON.parse(crypto.aesDecrypt(token, config.TokenKey))
            // console.log(tokenData.toString() + " now: " + Date.now());
        } catch (e) {
            // 说明解码失败，需要抛出一个明确的异常
            throw Error("token不合法")
        }
        // 由于tokenData中包含过期时间和username
        //1. 检查是否过期
        if (tokenData.expire < Date.now()) {
            throw Error("token已过期")
        }
        //2. 检查username是否存在，以防止非法用户
        let user = await accountService.getUserByUsername(tokenData.username);
        if (!user) {
            throw Error("token不合法")
        }
        // 说明username合法，将user信息赋予req上下文对象，这样后续的每个中间件和处理函数都能直接从req中取出user使用
        req.user = user;
    }
    // 最后不要忘了放行
    next()
};