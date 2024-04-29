/*
 * @Description:
 * @Date: 2022-09-02 17:55:51
 * @FilePath: /quzhou-carbon/src/config/index.js
 */
// 配置信息

// localStorage保存用户相关信息的key名称
const USER_LOCALSTORAGE_NAME = 'quzhouSys';

// 超级管理员key
const SUPER_ADMIN = 'SUPER_ADMIN';
// 管理员key
const ADMIN = 'ADMIN';

// 上传文件地址
const UPDATEPATH = import.meta.env.VITE_BASE_URL + '/qq-oms/acc/uploadAcc';
// const UPDATEPATH = import.meta.env.VITE_BASE_URL + '/acc/uploadAcc';

// 菜单主题（选中颜色、hover颜色前往MenuLeft组件修改）
const themeList = [
    {
        theme: 'dark', // 主题名称
        menuLeftBc: '#191A23', // 背景色
        textColor: '#BABBBD', // 文字颜色
        activeColor: '#ffffff', // 文字选中颜色
        iconColor: '#BABBBD', // 图标颜色
        iconColorActive: '#FFFFFF', // 图标选中颜色
        tabbarBackground: '#FFFFFF', // 顶栏背景色
    },
    {
        theme: 'light',
        menuLeftBc: '#ffffff',
        textColor: '#515a6e',
        activeColor: '#3296fa',
        iconColor: '#515a6e',
        iconColorActive: '#333333',
        tabbarBackground: '#FFFFFF',
    },
];

//加密解密密钥
const crypto = {
    iv: 'Kb3Xp4XPhyYUgRi3',
    key: 'IB5ZXAcNbofJCgLB',
};

export { USER_LOCALSTORAGE_NAME, themeList, SUPER_ADMIN, ADMIN, UPDATEPATH, crypto };
