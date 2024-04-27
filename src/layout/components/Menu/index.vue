<template>
    <div class="menu-left" :style="{ width: menuLeftWidth }">
        <div class="top" @click="handleCollapseMenu">
            <render-icon v-if="collapse" icon="icon-menu-unfold"></render-icon>
            <render-icon v-else icon="icon-menu-fold"></render-icon>
            <span v-if="!collapse">收起</span>
        </div>
        <el-scrollbar>
            <a-menu
                v-model:open-keys="openRouter.openKeys"
                v-model:collapsed="collapse"
                class="a-menu"
                theme="light"
                :selected-keys="openRouter.selectedKeys"
                :default-selected-keys="openRouter.selectedKeys"
                :default-open-keys="openRouter.openKeys"
                :collapsed-width="shrinkWidth"
                :auto-open-selected="true"
                accordion
            >
                <SubMenu :menu-data="menuList" />
            </a-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import SubMenu from '@/layout/components/SubMenu/SubMenu.vue';
import RenderIcon from '@/utils/renderIcon';
import { menuLeftOpenWidth, menuLeftShrinkWidth } from '@/config/menu';
import { useMenuStore } from '@/stores/modules/menu';
import { useSettingStore } from '@/stores/modules/setting';
import { computed, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { ElScrollbar } from 'element-plus';
import 'element-plus/dist/index.css';

export default {
    name: 'LeftMenu',
    components: { SubMenu, ElScrollbar, RenderIcon },
    setup() {
        const router = useRouter();
        const menuStore = useMenuStore();
        const settingStore = useSettingStore();

        const shrinkWidth = parseInt(menuLeftShrinkWidth.replace(/px/g, ''));

        // 侧栏状态
        const collapse = ref(false);

        const menuLeftWidth = computed(() => {
            return menuStore.collapse ? menuLeftShrinkWidth : menuLeftOpenWidth;
        });

        watch(
            () => menuStore.collapse,
            (value) => {
                collapse.value = value;
            },
            {
                immediate: true,
            },
        );

        const openRouter = reactive({
            selectedKeys: [],
            openKeys: [],
        });

        //
        watch(
            () => router.currentRoute.value.path,
            (value) => {
                // 获取/的次数
                let count = value.split('/');
                // 超过1次后说明为多级表单，设置默认打开的列表
                if (count.length - 1 > 1) {
                    // 去除最后一个
                    count.splice(count.length - 1, 1);
                    openRouter.openKeys = [count.join('/')];
                } else {
                    openRouter.openKeys = [];
                }
                if (router.currentRoute.value.meta.selectPath) {
                    let selectPath = count + '/' + router.currentRoute.value.meta.selectPath;
                    openRouter.selectedKeys = [selectPath.split(',').join('/')];
                } else {
                    openRouter.selectedKeys = [value];
                }
            },
            {
                deep: true,
                immediate: true,
            },
        );

        // 侧栏主题
        const theme = computed(() => {
            return settingStore.theme;
        });

        const menuList = computed(() => {
            return menuStore.currentLeftMenu || [];
        });

        // 展开或收起按钮
        const handleCollapseMenu = () => {
            collapse.value = !collapse.value;
            // 设置侧栏数据
            menuStore.setMenuCollapse(collapse.value);
        };

        return {
            collapse,
            openRouter,
            menuList,
            theme,
            menuLeftOpenWidth,
            shrinkWidth,
            menuLeftWidth,
            handleCollapseMenu,
        };
    },
};
</script>

<style lang="scss">
.menu-left {
    // 浅色主体
    .arco-menu-light {
        .arco-menu-inline-header.arco-menu-selected {
            color: #fff;
            background-color: rgba(22, 93, 255, 1);
            box-shadow: 0 2px 6px 0 rgba(22, 93, 255, 0.22);
            border-radius: 4px;

            .arco-menu-icon {
                .arco-icon {
                    color: #fff !important;
                }
            }

            .arco-menu-inline-content {
                padding-left: 20px;
            }
        }

        .arco-menu-pop-header.arco-menu-selected,
        .arco-menu-item.arco-menu-selected {
            color: #fff;
            background-color: $theme-dark-color;
            box-shadow: 0 2px 6px 0 rgba(22, 93, 255, 0.22);
            border-radius: 4px;

            .arco-menu-icon {
                .arco-icon {
                    color: rgba(255, 255, 255, 1) !important;
                }
            }
        }
    }
}
</style>

<style lang="scss" scoped>
.menu-left {
    position: fixed;
    height: calc(100vh - $top-bar-height);
    user-select: none;
    z-index: 100;
    top: $top-bar-height;
    left: 0;
    box-shadow: 5px 5px 8px 0 rgba(29, 35, 41, 0.05);
    transition: all 0.3s ease-in-out;
    background: #fff;

    .top {
        height: 0.64rem;
        line-height: 0.64rem;
        text-align: center;
        font-size: 0.16rem;
        font-weight: 500;
        color: #999999;
        cursor: pointer;

        span {
            margin-left: 12px;
        }
    }

    .scrollbar {
        height: 100%;
    }

    .a-menu {
        width: 100% !important;
        height: 100%;
        border-radius: 0 !important;
        transition: width 0.3s ease-in-out;

        :deep(.arco-menu-inner) {
            padding: 0 12px;

            .arco-menu-item,
            .arco-menu-inline-header {
                font-size: $menu-title-size;
                margin-bottom: 14px;
                cursor: pointer;
                height: $menu-left-menu-item-height;
                line-height: $menu-left-menu-item-height;
                padding-left: 16px;
                font-weight: 500;

                .arco-menu-icon {
                    margin-right: 16px;

                    .arco-icon {
                        font-size: 0.18rem;
                        color: rgba(196, 199, 208, 1);
                    }
                }

                // &:not(.arco-menu-has-icon) {
                //   .arco-menu-item-inner {
                //     // margin-left: 14px !important;
                //   }
                // }
            }
        }

        :deep(.arco-menu-pop-header) {
            margin-bottom: 14px;
            :deep(.arco-menu-icon) {
                font-size: 0.16rem;
                margin-right: 3px !important;
                text-align: center;
            }
        }
        :deep(.arco-menu-inline) {
            .arco-menu-selected {
                background-color: $theme-dark-color;
                .arco-icon {
                    color: #fff;
                }
            }
        }
        :deep(.arco-menu-inline-content) {
            padding-left: 20px;
            .submenu {
                position: relative;
                &:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    height: 100%;
                    border-right: 1px dashed rgba(196, 199, 208, 0.7);
                }

                .arco-menu-selected {
                    background: rgba(245, 246, 252, 1);
                    color: $theme-dark-color;
                    box-shadow: none;
                }

                .arco-menu-item {
                    margin-left: 8px;

                    .arco-menu-item-inner {
                        padding-left: 0.2rem;
                        font-size: $default-font-size;
                    }
                }
            }
        }
    }

    .arco-menu-collapsed {
        :deep(.arco-menu-pop-header) {
            height: 0.46rem;
            line-height: 0.46rem;
        }

        :deep(.arco-menu-icon) {
            font-size: 0.16rem;
            margin-right: 3px !important;
            text-align: center;
        }

        :deep(.arco-menu-title) {
            display: none;
        }

        :deep(.arco-menu-pop-header) {
            padding-right: 12px;
            padding-left: 16px;
            justify-content: center;

            .arco-menu-icon {
                .arco-icon {
                    color: rgba(196, 199, 208, 1);
                }
            }
        }

        :deep(.arco-menu-item.arco-menu-has-icon) {
            justify-content: center;
        }
    }
}
</style>
