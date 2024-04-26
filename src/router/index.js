/*
 * @Description:
 * @Date: 2022-08-30 14:43:30
 * @FilePath: /quzhou-carbon/src/router/index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Order from '@/router/moudles/order';
import { GlobalStore } from '@/stores/modules/global';
import { useMenuStore } from '@/stores/modules/menu';
import { getMenuList } from '@/api/menuApi';

NProgress.configure({
    easing: 'ease',
    speed: 500,
    showSpinner: false,
});
const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    // 登陆
    {
        path: '/login',
        name: '登录',
        component: () => import('@/views/login/index.vue'),
    },
    // 免密登录页面
    {
        path: '/loginAuth',
        name: '免密登录',
        component: () => import('@/views/login/loginAuth.vue'),
    },
    // 404
    {
        path: '/exception',
        name: '404',
        component: () => import('@/views/errorPage/index.vue'),
    },
    // 同配路由
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/errorPage/index.vue'),
    },
    // ...Order
];
export const allRoutes = [...Order];

// 初始化路由
let router = createRouter({
    history: createWebHashHistory(),
    routes,
});
let counter = 0;
// 路由拦截
router.beforeEach(async (to, from, next) => {
    // 1. 页面跳转之前，开启进度条
    NProgress.start();
    const globalStore = GlobalStore();

    // 2. 是否跳转登陆页
    if (to.path.toLocaleLowerCase() === '/login') {
        return next();
    }

    // 3. 判断是否有过去时间 并且是否过期
    if (globalStore.expirationTime && Date.now() > new Date(globalStore.expirationTime).getTime()) {
        globalStore.clearUser();
        return next({ path: '/login', replace: true });
    }

    if (to.meta && to.meta.authority && !globalStore.isLogin) return next({ path: '/login', replace: true });

    // 4. 判断是否是登陆状态
    // if (!globalStore.isLogin) return next({ path: '/login', replace: true })

    // 5. 判断是否有路由权限
    const menuStore = useMenuStore();
    if (menuStore.userRoutes.length <= 0) {
        await getMenuList();
        return next({ ...to, replace: true });
    }

    // 6. 页面跳转
    next();
});

// 路由跳转之后
router.afterEach(() => {
    // 关闭进度条
    NProgress.done();
    // 回到顶部
    // window.scrollTo(0, 0);
});

export default router;
