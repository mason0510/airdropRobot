let logger_str=(str)=>{
    console.log(str);
};

/**
 * 在外部通过点语法添加
 */

let logger_obj=(obj)=>{
    console.log(obj);
};

module.exports={logger,logger_obj,logger_fun}