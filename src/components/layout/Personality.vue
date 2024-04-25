<template>
  <a-drawer :visible="visible" :width="265" :footer="false" @cancel="close">
    <div class="drawer-con">
      <p class="title">主题风格</p>
      <div class="theme-wrap">
        <div v-for="(item, index) in dayThemeList" :key="item.theme" class="item" @click="setDarkTheme(item.theme)">
          <div class="box">
            <div :style="{ background: item.color[0] + '!important' }"></div>
            <div
              :style="{
                background: index === 2 ? item.color[1] : item.color[0] + '!important'
              }"
            ></div>
          </div>
          <p class="name">{{ item.title }}</p>
          <div v-show="item.theme === currentView" class="active"></div>
        </div>
      </div>

      <p class="title">菜单风格</p>
      <div class="menu-theme-wrap">
        <div v-for="item in themeData" :key="item.theme" class="item" @click="setUpTheme(item.theme)">
          <div class="box">
            <div class="top" :style="{ background: item.tabbarBackground + '!important' }"></div>
            <div class="left" :style="{ background: item.menuLeftBc + '!important' }"></div>
          </div>
          <div v-if="item.theme === currentTheme" class="active"></div>
        </div>
      </div>
    </div>
  </a-drawer>
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue'
import { themeList } from '@/config'
import { useSettingStore } from '@/stores/setting'

export default {
  name: 'Personality',
  props: {
    show: {
      // 是否显示
      type: Boolean,
      default: true
    }
  },
  emits: ['click', 'closePersonality'],
  setup(props, { emit }) {
    let settingStore = useSettingStore()

    // 抽屉是否显示
    let visible = computed(() => {
      return props.show
    })

    let currentTheme = computed(() => {
      return settingStore.theme
    })

    // 主题
    let currentView = computed(() => {
      return settingStore.themeModel
    })

    let dayList = [6, 18]

    // 自动关闭
    const isAutoClose = () => {
      emit('closePersonality')
    }

    // 关闭抽屉
    const close = () => {
      emit('click')
    }

    // 侧栏配置
    let themeData = ref(themeList)

    // 设置主题
    const setUpTheme = theme => {
      settingStore.setUpTheme(theme)
      // isAutoClose();
    }

    // 主题设置
    let dayThemeList = reactive([
      {
        theme: 'light',
        title: '亮色',
        color: ['#fff', '#fff']
      },
      {
        theme: 'dark',
        title: '黑夜',
        color: ['#22252A']
      },
      {
        theme: 'auto',
        title: '自动',
        color: ['#fff', '#22252A']
      }
    ])

    // 修改模式
    const setThemeModel = theme => {
      settingStore.setThemeModel(theme)
    }

    const setDarkTheme = theme => {
      let el = document.getElementsByTagName('html')[0]

      if (theme === 'dark') {
        el.setAttribute('class', 'dark-body')
      } else if (theme === 'light') {
        el.removeAttribute('class')
      } else if (theme === 'auto') {
        setAutoThemeModel(el)
      }
      setThemeModel(theme)
    }

    const setAutoThemeModel = el => {
      let d = new Date()
      let h = d.getHours()
      setThemeModel('auto')

      if (h >= dayList[0] && h < dayList[1]) {
        el.removeAttribute('class')
      } else {
        el.setAttribute('class', 'dark-body')
      }
    }

    onMounted(() => {
      setDarkTheme(currentView.value)
    })

    return {
      visible,
      currentTheme,
      dayThemeList,
      themeData,
      currentView,
      close,
      isAutoClose,
      setUpTheme,
      setThemeModel,
      setDarkTheme,
      setAutoThemeModel
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-con {
  padding: 0;

  .title {
    text-align: center;
    color: #000;
    font-size: 13px;
    position: relative;

    &:first-of-type {
      margin-top: 20px;
    }

    &::before {
      content: '';
      width: 50px;
      border-bottom: 2px solid #f3f4f5;
      position: absolute;
      left: 0;
      top: 10px;
      margin: auto;
    }

    &::after {
      content: '';
      width: 50px;
      border-bottom: 2px solid #f3f4f5;
      position: absolute;
      right: 0;
      top: 10px;
      margin: auto;
    }
  }

  .theme-wrap {
    display: flex;
    flex-wrap: wrap;
    margin-top: 25px;

    .item {
      width: 65px;
      box-sizing: border-box;
      margin-right: 15px;

      &:last-of-type {
        margin-right: 0;
      }

      .box {
        width: 100%;
        height: 45px;
        box-shadow: 0 0 5px #ccc;
        position: relative;
        background: #f5f7f9;
        box-sizing: border-box;
        border-radius: 6px;
        transition: box-shadow 0.1s;
        cursor: pointer;
        display: flex;
        overflow: hidden;

        > div {
          width: 50%;
          height: 100%;
        }
      }

      .name {
        text-align: center;
        margin-top: 6px;
        color: #515a6e;
        font-size: 12px;
      }

      .active {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        position: relative;
        left: 0;
        right: 0;
        bottom: -5px;
        margin: auto;
        background: #19be6b !important;
      }
    }
  }

  .menu-theme-wrap {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;

    .item {
      width: 65px;
      margin-right: 15px;

      .box {
        width: 65px;
        height: 45px;
        box-shadow: 0 0 5px #ccc;
        position: relative;
        background: #f5f7f9 !important;
        box-sizing: border-box;
        border-radius: 6px;
        overflow: hidden;
        transition: box-shadow 0.1s;
        cursor: pointer;

        &:hover {
          box-shadow: 0 0 10px #ccc;
        }

        &:nth-child(even) {
          margin-right: 0;
        }

        .top {
          width: 100%;
          height: 8px;
        }

        .left {
          position: absolute;
          top: 0;
          left: 0;
          width: 16px;
          height: 100%;
        }
      }

      .active {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin: auto;
        margin-top: 8px;
        background: #19be6b !important;
      }
    }
  }
}
</style>
