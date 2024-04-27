/*
 * @Description:
 * @Date: 2022-09-02 17:55:51
 * @FilePath: /quzhou-carbon/src/router/moudles/system.js
 */
import index from '@/layout/index.vue';

export default [
    {
        path: '/order',
        component: index,
        name: 'Order',
        meta: {
            icon: '',
            // show: true,
            // authority: 1,
            title: '订单管理',
        },
        children: [
            {
                path: 'list',
                name: 'OrderList',
                meta: {
                    title: '订单列表',
                    // authority: 1,
                    icon: 'Document',
                    show: true, // 是否在侧栏中显示
                },
                component: () => import('@/views/order/list/index.vue'),
            },
            {
                path: 'refund',
                name: 'OrderRefund',
                meta: {
                    title: '退单列表',
                    // authority: 1,
                    icon: 'Memo',
                    show: true, // 是否在侧栏中显示
                },
                component: () => import('@/views/order/refund/index.vue'),
            },
            {
                path: 'definite',
                name: 'OrderDefinite',
                meta: {
                    title: '订单明细列表',
                    // authority: 1,
                    icon: 'DocumentCopy',
                    show: true, // 是否在侧栏中显示
                },
                component: () => import('@/views/order/definite/index.vue'),
            },
        ],
    },
];
