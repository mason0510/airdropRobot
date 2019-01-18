const role_permissions = [
    // 商家角色，和它对应的权限正则
    {
        role: 0,
        permission: [
            /.*\/product.*/,
            /.*\/order.*/,
            /.*\/category.*/
        ]
    },
    // 管理员角色，和它对应的权限正则
    {
        role: 100,
        permission: [
            /.*/
        ]
    }
];

module.exports = function (req, res, next) {
    // 如果是验证过的用户才去判断
    // console.log("user："+JSON.stringify(req.user));
    if (req.user) {
        let isGo = false;
        role_permissions.forEach(el => {
            if (el.role === req.user.role) {
                el.permission.forEach(p => {
                    if (p.test(req.url)) {
                        isGo = true;
                    }
                });
            }
        });

        if (!isGo) {
            throw Error("当前用户权限不够")
        }
    }

    next();
}