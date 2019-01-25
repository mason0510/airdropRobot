const User = require('../model/user');
const config = require('../config/configdb')
//const crypto = require('lxj-crypto');

//操作数据库such as
getUserByname=async (username)=>{
  return await User.findOne({username:username}).select('-__v');
};

//check


checkCanInsertUser=async (user)=> {
    //检查密码是否为空
    if(!user.password || user.password.length===0){
        throw Error("密码不能为空")
    }
    //检查用户是否已经存在
    let res = await getUserByUsername(user.username);
    if(res){
        throw Error("用户名已经存在")
    }
};

/**
 * 添加普通用户
 * @param user
 * @returns {Promise<void>}
 */
addUser=async (user)=> {
    await checkCanInsertUser(user);

    user.role = 0;
    user.created = Date.now();

    //对密码进行加密,加密的方式：使用username作为随机数对password进行哈希
    // user.password = crypto.md5Hmac(user.password, user.username)
    user.password ="";
    await User.create(user)
};


module.exports={getUserByname,addUser,checkCanInsertUser};