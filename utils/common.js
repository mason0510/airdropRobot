class Ut {
    /**
     * 异步延迟
     * @param {number} time 延迟的时间,单位毫秒
     */
    static sleep(time = 0) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i <100 ; i++) {
                setTimeout(() => {
                    resolve();
                }, i*10000);
            }


        })

    };
}

module.exports = Ut;
