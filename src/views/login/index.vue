<template>
    <div class="login">
        <div class="title">峰林布依景区智慧管理平台</div>
        <!-- 表单 -->
        <div class="login-main">
            <p class="login-title">欢迎使用</p>
            <a-form ref="formRef" :model="form" class="login-content" @keyup.enter="toLogin">
                <a-form-item hide-label field="userPhone" :rules="[{ required: true, message: '手机号不能为空' }]">
                    <a-input v-model="form.userPhone" placeholder="请输入手机号" maxlength="11" @change="getVerCode" />
                </a-form-item>
                <a-form-item field="password" hide-label :rules="[{ required: true, message: '密码不能为空' }]">
                    <a-input-password v-model="form.password" placeholder="请输入密码" :max-length="18" size="large" />
                </a-form-item>
                <a-form-item field="code" hide-label :rules="[{ required: true, message: '验证码不能为空' }]">
                    <a-input v-model="form.code" placeholder="请输入验证码" :maxlength="4" size="large" @keyup.enter="toLogin">
                        <template #append>
                            <img class="verCode" :src="codeUrl" alt="验证码" @click="getVerCode" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item hide-label>
                    <a-button type="primary" :loading="loading" @click="toLogin">登录</a-button>
                    <!-- <a-button type="primary" :loading="loading" @click="toPage">免密登录</a-button> -->
                </a-form-item>
            </a-form>
        </div>

        <!-- 动画 -->
        <div class="cartoon-bg">
            <div id="lottie1" ref="lottie1Dom" class="loittie-1"></div>
            <div id="lottie2" ref="lottie2Dom" class="loittie-2"></div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import router from '@/router/index';
import { GlobalStore } from '@/stores/modules/global';
import { getAssetsFile, debounce } from '@/utils/util';
import { getCode, login } from '@/api/login';
import { Base64 } from 'js-base64';
import { Message } from '@arco-design/web-vue';
import CryptoJS from 'crypto-js';
import { crypto } from '@/config';
import Lottie from 'lottie-web';

// 登陆表单
const form = reactive({
    userPhone: '',
    password: '',
    code: '',
});

// 登陆加载状态
const loading = ref(false);

//验证码
const codeUrl = ref(getAssetsFile('login/no-verify.png'));

// 获取验证码
const getVerCode = debounce(async () => {
    if (!form.userPhone || form.userPhone.length !== 11) return Message.warning('请先输入手机号');
    console.log(form);
    const res = await getCode({ userName: Base64.encode(form.userPhone) });
    if (!res) return Message.warning('验证码请求次数过多,请于10分钟后重试');

    codeUrl.value = res;
});

const globalStore = GlobalStore();

// 登陆
const formRef = ref();
const toLogin = () => {
    formRef.value.validate(async (err) => {
        if (err) return;
        try {
            loading.value = true;
            const param = {
                userName: Base64.encode(form.userPhone),
                password: Base64.encode(form.password),
                code: form.code,
            };
            const iv = CryptoJS.enc.Utf8.parse(crypto.iv);
            const key = CryptoJS.enc.Utf8.parse(crypto.key);
            let parms = CryptoJS.enc.Utf8.parse(JSON.stringify(param));
            const enc = CryptoJS.AES.encrypt(parms, key, {
                iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            }).toString();

            const res = await login({ enc });
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
            globalStore.user === 'PERSONNEL' ? router.push('/system') : router.push('/reduce');
        } finally {
            getVerCode();
            loading.value = false;
        }
    });
};

const toPage = () => {
    window.open('/loginAuth');
};

// 动画节点
const lottie1Dom = ref(null);
const lottie2Dom = ref(null);

function svga() {
    const lottie1 = Lottie.loadAnimation({
        container: lottie1Dom.value, // 包含动画的dom元素
        renderer: 'svg', // 渲染出来的是什么格式
        loop: false, // 循环播放
        autoplay: true, // 自动播放
        // path: import.meta.env.PROD ? 'https://oss-dcc.co2bigdata.com/zhuti.json' : '/loittie/zhuti.json' // 动画json的路径
        path: '/loittie/zhuti.json', // 动画json的路径
    });
    const lottie2 = Lottie.loadAnimation({
        container: lottie2Dom.value, // 包含动画的dom元素
        renderer: 'svg', // 渲染出来的是什么格式
        loop: false, // 循环播放
        autoplay: true, // 自动播放
        // path: import.meta.env.PROD ? 'https://oss-dcc.co2bigdata.com/box.json' : '/loittie/box.json' // 动画json的路径
        path: '/loittie/box.json', // 动画json的路径
    });
    // 监听complete事件,反向播放
    reversePlay(lottie1);
    reversePlay(lottie2);
}

// 反向播放循环播放
function reversePlay(lottieDom, direction = 1) {
    lottieDom.setSpeed(0.8);
    lottieDom.addEventListener('complete', () => {
        direction === 1 ? (direction = -1) : (direction = 1);
        lottieDom.pause();
        lottieDom.setDirection(direction);
        lottieDom.play();
    });
}

onMounted(() => {
    svga();
});
</script>

<style lang="scss" scoped>
.login {
    height: 100vh;
    width: 100%;
    background: url('../../assets/img/login/bj.jpg') no-repeat;
    background-size: 100% 100%;
    position: relative;

    .title {
        position: absolute;
        font-size: 36px;
        color: rgb(22, 93, 255);
        font-weight: bold;
        right: 2rem;
        top: 15vh;
    }

    .login-main {
        position: absolute;
        right: 1.6rem;
        top: 38vh;
        width: 400px;
        height: 380px;
        background: #ffffff;
        border-radius: 10px;
        padding: 28px 50px 0 50px;
        box-sizing: border-box;
        transform: scaleX(1.1) scaleY(1.1);
        z-index: 1000;

        .login-title {
            text-align: center;
            font-size: 22px;
            font-weight: 500;
            margin: 0;
        }

        .login-content {
            margin-top: 24px;
            .verCode {
                cursor: pointer;
                width: 90px;
                height: 38px;
            }
        }

        :deep(.login-content) {
            .arco-btn {
                width: 100%;
                height: 40px;
            }
            .arco-form-item-wrapper-col {
                padding-bottom: 5px;
                position: relative;
            }
            .arco-input-wrapper {
                height: 40px;
                border-radius: 4px;
            }
            .arco-input {
                font-size: 14px;
            }
            .arco-input-append {
                padding: 0;
                border: none;
                background-color: transparent;
            }
        }
    }

    .cartoon-bg {
        width: 12rem;
        height: 100vh;
        position: absolute;
        bottom: 0;
        overflow: hidden;
        border-style: none;
        caret-color: rgba(0, 0, 0, 0);

        img {
            width: 100%;
            position: absolute;
            top: 0.8rem;
        }

        .loittie-1 {
            width: 6rem;
            height: 3.8rem;
            position: absolute;
            right: 3.8rem;
            /* top: 24%; */
            bottom: 23vh;
        }

        .loittie-2 {
            width: 2rem;
            height: 2rem;
            position: absolute;
            right: 1.2rem;
            bottom: 32vh;
            transform: rotateX(30deg);
        }
    }
}
</style>
