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
      authority: 1,
      title: '系统设置'
    },
    children: [
      {
        path: 'bigSetting',
        name: 'BigSetting',
        meta: {
          title: '大屏配置',
          authority: 1,
          icon: 'JT-qiyetianbaoshiduanpeizhi-weixuanze',
          show: true // 是否在侧栏中显示
        }
      }
    ]
  }
]
