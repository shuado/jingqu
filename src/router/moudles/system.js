/*
 * @Description:
 * @Date: 2022-09-02 17:55:51
 * @FilePath: /quzhou-carbon/src/router/moudles/system.js
 */
import index from '@/layout/index'

export default [
  {
    path: '/system',
    component: index,
    name: 'System',
    meta: {
      icon: '',
      title: '系统设置'
    },
    children: [
      {
        path: 'bigSetting',
        name: 'BigSetting',
        meta: {
          title: '大屏配置',
          icon: 'JT-qiyetianbaoshiduanpeizhi-weixuanze',
          show: true // 是否在侧栏中显示
        },
        children: [
          {
            path: 'reduceCarbon',
            name: 'ReduceCarbon ',
            meta: {
              title: '减污降碳首页',
              show: true // 是否在侧栏中显示
            },
            component: () => import('@/views/system/bigScreen/reduceCarbon/index.vue')
          },
          {
            path: 'carbonEmission',
            name: 'CarbonEmission',
            meta: {
              title: '碳排放配额',
              show: true // 是否在侧栏中显示
            },
            component: () => import('@/views/system/bigScreen/carbonEmission/index.vue')
          },
          {
            path: 'collaborative',
            name: 'Collaborative',
            meta: {
              title: '协同试点配置',
              show: true // 是否在侧栏中显示
            },
            component: () => import('@/views/system/bigScreen/collaborative/index.vue')
          },
          {
            path: 'engineering',
            name: 'Engineering',
            meta: {
              title: '工程详情配置',
              show: true // 是否在侧栏中显示
            },
            component: () => import('@/views/system/bigScreen/engineering/index.vue')
          },
          {
            path: 'demonstration',
            name: 'Demonstration',
            meta: {
              title: '示范试点配置',
              show: true // 是否在侧栏中显示
            },
            component: () => import('@/views/system/bigScreen/demonstration/index.vue')
          },
          {
            path: 'environment',
            name: 'Environment',
            meta: {
              title: '环境质量记录',
              show: true // 是否在侧栏中显示
            },
            component: () => import('@/views/system/bigScreen/environment/index.vue')
          }
        ]
      },
      {
        path: 'carbonTrade',
        name: 'CarbonTrade',
        meta: {
          title: '碳交易配置',
          icon: 'JT-qiyetianbaoshiduanpeizhi-weixuanze',
          show: true // 是否在侧栏中显示
        },
        children: [
          {
            path: 'entpriseQuota',
            name: 'EntpriseQuota ',
            meta: {
              title: '企业配额管理',
              show: true // 是否在侧栏中显示
            },
            component: () => import('@/views/system/carbonTrade/entpriseQuota/index.vue')
          },
          {
            path: 'mortgageQuota',
            name: 'MortgageQuota ',
            meta: {
              title: '抵押配额管理',
              show: true // 是否在侧栏中显示
            },
            component: () => import('@/views/system/carbonTrade/mortgageQuota/index.vue')
          },
          {
            path: 'information',
            name: 'Information ',
            meta: {
              title: '碳交易信息',
              show: true // 是否在侧栏中显示
            },
            component: () => import('@/views/system/carbonTrade/information/index.vue')
          },
          {
            path: 'entManage',
            name: 'entManage ',
            meta: {
              title: '企业信息管理',
              show: true // 是否在侧栏中显示
            },
            component: () => import('@/views/system/carbonTrade/entManage/index.vue')
          }
        ]
      },
      {
        path: 'log',
        name: 'Log',
        meta: {
          title: '日志管理',
          icon: 'JT-qiyetianbaoshiduanpeizhi-weixuanze',
          show: true // 是否在侧栏中显示
        },
        component: () => import('@/views/system/log')
      }
    ]
  }
]
