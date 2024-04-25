/*
 * @Description:
 * @Date: 2022-09-02 17:55:51
 * @FilePath: /quzhou-carbon/src/router/moudles/system.js
 */
import index from '@/layout/index'

export default [
  {
    path: '/order',
    component: index,
    name: 'Order',
    meta: {
      icon: '',
      // show: true,
      // authority: 1,
      title: '订单管理'
    },
    children: [
      {
        path: 'list',
        name: 'OrderList',
        meta: {
          title: '订单列表',
          // authority: 1,
          icon: 'JT-qiyetianbaoshiduanpeizhi-weixuanze',
          show: true // 是否在侧栏中显示
        },
        component: () => import('@/views/order/list/index.vue')
      }
    ]
  }
]
