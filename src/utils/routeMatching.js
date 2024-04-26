/*
 * @Description:
 * @Date: 2022-06-30 16:32:00
 * @FilePath: /quzhou-carbon/src/utils/routeMatching.js
 */
// import { SUPER_ADMIN } from "@/config";

/**
 * 根据权限匹配路由
 * */

export async function routerMatch(allowRouters, powers, USER_TYPE) {
    return await new Promise((resolve) => {
        let routers = allowRouters;

        if (powers) return;

        // if (USER_TYPE) return;
        /**
         * 路由与权限匹配 并去除没有权限的路由
         * @param permission 路由集合
         * @param type 是否是顶级路由 true | false
         * @param pathAddress 上层路由地址
         */

        const noRouter = new Set(['Order']);

        function createRouter(permission, type = true, pathAddress) {
            for (let i = permission.length - 1; i >= 0; i--) {
                let item = permission[i];
                // 根据权限执行对应的权限删除操作
                /*相关操作： 略*/
                // if (USER_TYPE === 'PERSONNEL') {
                //   if (!noRouter.has(item.name)) {
                //     permission.splice(i, 1)
                //     continue
                //   }
                // }

                // 判断是否为顶层，并拼接路由地址并为有子集的路由重定向
                if (!type) {
                    item.pathAddress = pathAddress + '/' + item.path;
                } else {
                    item.pathAddress = item.path;
                }

                if (item.children && item.children.length) {
                    // 去除子集没有权限的路由
                    createRouter(item.children, false, item.pathAddress);
                    // 设置重定向
                    for (let obj of item.children) {
                        // 判断是否在侧栏显示
                        if (obj && obj.meta.show) {
                            item.redirect = obj.pathAddress;
                            break;
                        }
                    }
                }
            }
        }

        createRouter(routers, true, '');
        resolve(Array.from(new Set(routers)));
    });
}
