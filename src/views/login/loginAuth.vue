<template>
    <div class="login">
        <a-spin dot tip="登录中..." />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router/index';
import { GlobalStore } from '@/stores/modules/global';
import { loginTo } from '@/api/login';
import { Base64 } from 'js-base64';
import { Message } from '@arco-design/web-vue';
import CryptoJS from 'crypto-js';
import { crypto } from '@/config';

// 登陆表单
const form = {
    userPhone: '18800000000',
    password: 'Aa1234567*',
};

const globalStore = GlobalStore();

// 登陆
const toLogin = async () => {
    try {
        const param = {
            userName: Base64.encode(form.userPhone),
            password: Base64.encode(form.password),
        };
        const iv = CryptoJS.enc.Utf8.parse(crypto.iv);
        const key = CryptoJS.enc.Utf8.parse(crypto.key);
        let parms = CryptoJS.enc.Utf8.parse(JSON.stringify(param));
        const enc = CryptoJS.AES.encrypt(parms, key, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }).toString();

        const res = await loginTo({ enc });
        if (res.code < 0) return;
        // 设置登陆状态
        globalStore.setLoginStatus(true);
        // // 设置token
        globalStore.setToken(res.data.token);
        // // 设置过期时间
        globalStore.setTime(res.data.expirationTime);
        // // 设置用户信息
        globalStore.setUser(res.data.systemCode);
        // 跳转大屏
        globalStore.user === 'PERSONNEL' ? router.push('/order/list') : router.push('/order/list');
    } catch (err) {
        Message.error('免密登录失败');
        router.push('/login');
    }
};

onMounted(() => {
    let ref = '';
    if (document.referrer.length > 0) ref = document.referrer;
    try {
        if (ref.length === 0 && opener.location.href.length > 0) ref = opener.location.href;
        if (ref.includes('quzhou.co2bigdata.com') || ref.includes('220.191.238.197')) return toLogin();
        router.push('/login');
    } catch (e) {
        router.push('/login');
    }
});
</script>

<style lang="scss" scoped>
.login {
    height: 100vh;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba($color: #000000, $alpha: 0.3);
}
</style>
