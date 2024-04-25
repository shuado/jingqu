/*
 * @Description:
 * @Date: 2022-06-30 16:32:00
 * @FilePath: /quzhou-carbon/src/api/menuApi/index.js
 */
import router from '@/router'
import { cloneDeep } from 'lodash-es'
import { routerMatch } from '@/utils/routeMatching'

import { useMenuStore } from '@/stores/modules/menu'
import { GlobalStore } from '@/stores/modules/global'
// import { USER_LOCALSTORAGE_NAME } from "@/config";

// 模拟获取菜单数据
export function getMenuList() {
  // 获取用户信息
  // let sys = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_NAME));

  let menuStore = useMenuStore()

  const globalStore = GlobalStore()
}
