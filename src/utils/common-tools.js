/*
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-06-23 13:21:16
 * @Description:
 */
/*
 * @Author: 舒 shd_cn@163.com
 * @Date: 2023-08-17 17:46:24
 * @Description:
 */
/*
 * @Description: 正则
 * @Date: 2021-09-11 01:03:22
 */
import { cloneDeep } from 'lodash-es';

// 时间格式化
export const timeFormat = (val, s) => {
    if (!val) {
        return '';
    }
    if (s) {
        val = val * 1000;
    }
    const date = new Date(val);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let second = date.getSeconds();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    min = min < 10 ? '0' + min : min;
    second = second < 10 ? '0' + second : second;
    return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + second;
};

/**
 * @description: 获取窗口缩放大小
 * @param {*}
 * @return {*}
 * @author: 舒
 */
export const detectZoom = () => {
    let ratio = 0;
    const screen = window.screen,
        ua = navigator.userAgent.toLowerCase();
    if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    } else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
            ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
    } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
    }
    if (ratio) {
        ratio = Math.round(ratio * 100);
    }
    return ratio;
};

/**
 * @description: 获取当前浏览器类型和版本号
 * @param {*}
 * @return {*}
 * @author: 舒
 */
export const getBrowser = () => {
    const UserAgent = navigator.userAgent.toLowerCase();
    const browserInfo = { type: '', versions: 0 };
    const browserArray = {
        IE: window.ActiveXObject || 'ActiveXObject' in window, // IE
        Chrome: UserAgent.indexOf('chrome') > -1 && UserAgent.indexOf('safari') > -1, // Chrome浏览器
        Firefox: UserAgent.indexOf('firefox') > -1, // 火狐浏览器
        Opera: UserAgent.indexOf('opera') > -1, // Opera浏览器
        Safari: UserAgent.indexOf('safari') > -1 && UserAgent.indexOf('chrome') === -1, // safari浏览器
        Edge: UserAgent.indexOf('edge') > -1, // Edge浏览器
        QQBrowser: /qqbrowser/.test(UserAgent), // qq浏览器
        WeixinBrowser: /MicroMessenger/i.test(UserAgent), // 微信浏览器
    };
    for (let i in browserArray) {
        if (browserArray[i]) {
            let versions = '';
            if (i === 'IE') {
                versions = UserAgent.match(/(msie\s|trident.*rv:)([\w.]+)/)[2];
            } else if (i === 'Chrome') {
                for (const mt in navigator.mimeTypes) {
                    //检测是否是360浏览器(测试只有pc端的360才起作用)
                    if (navigator.mimeTypes[mt]['type'] === 'application/360softmgrplugin') {
                        i = '360';
                    }
                }
                versions = UserAgent.match(/chrome\/([\d.]+)/)[1];
            } else if (i === 'Firefox') {
                versions = UserAgent.match(/firefox\/([\d.]+)/)[1];
            } else if (i === 'Opera') {
                versions = UserAgent.match(/opera\/([\d.]+)/)[1];
            } else if (i === 'Safari') {
                versions = UserAgent.match(/version\/([\d.]+)/)[1];
            } else if (i === 'Edge') {
                versions = UserAgent.match(/edge\/([\d.]+)/)[1];
            } else if (i === 'QQBrowser') {
                versions = UserAgent.match(/qqbrowser\/([\d.]+)/)[1];
            }
            browserInfo.type = i;
            browserInfo.versions = parseInt(versions);
        }
    }
    return browserInfo;
};

/**
 * @description: 获取屏幕分辨率
 * @param {*}
 * @return {*}
 * @author: 舒
 */
export const getResolution = () => {
    const height = (window.screen.height * detectZoom()) / 100; //乘以缩放比例为真实的像素
    const width = (window.screen.width * detectZoom()) / 100; //乘以缩放比例为真实的像素
    return { height, width, str: `${width} * ${height}` };
};

/**
 * @description: 获取工作区分辨率
 * @param {*}
 * @return {*}
 * @author: 舒
 */
export const getWorkResolution = () => {
    const height = (document.documentElement.clientHeight * detectZoom()) / 100; //乘以缩放比例为真实的像素
    const width = (document.documentElement.clientWidth * detectZoom()) / 100; //乘以缩放比例为真实的像素
    return { height, width, str: `${width} * ${height}` };
};

/**
 * @description: 日期年月日
 * @param {*}
 * @return {*}
 * @author: 舒
 */
export const getDate = () => {
    const date = new Date();
    date.setDate(date.getDate());
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    // var day = date.getDate()
    // month = month < 10 ? '0' + month : month
    // day = day < 10 ? '0' + day : day
    // return year + '-' + month + '-' + day
    return year + '年' + month + '月';
};

/**
 * @description: 时间格式化  自定义
 * @param {*}
 * @return {*}
 * @author: 舒
 */
export const dateFormat = (date, fmt) => {
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
    return fmt;
};

let debounceTimer; // 防抖
let throttleTimer; // 节流

/**
 * @description: 防抖
 * @param {*}
 * @return {*}
 * @author: 舒
 */
export const debounce = (fn, delay = 500) => {
    const delay1 = delay;
    return (function () {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(function () {
            debounceTimer = null;
            fn.apply(this);
        }, delay1);
    })();
};

/**
 * @description: 节流
 * @param {*}
 * @return {*}
 * @author: 舒
 */
export const throttle = (fn, interval = 200) => {
    let last;
    const interval1 = interval;
    return (function () {
        const now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(throttleTimer);
            throttleTimer = setTimeout(function () {
                last = now;
                fn.apply(this);
            }, interval1);
        } else {
            last = now;
            fn.apply(this);
        }
    })();
};
/**
 * @description: 拷贝到剪切板
 * @param {*}
 * @return {*}
 * @author: 舒
 */
export function copyClipboard(dom) {
    if (dom) {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNode(dom);
        selection?.removeAllRanges();
        selection?.addRange(range);
        document.execCommand('copy', false);
        document.execCommand('unselect', false);
    }
}

export const menuTree_bTos = (data) => {
    if (data && data.length > 0) {
        return JSON.parse(bTos(data));
    } else {
        return [];
    }
};

/**
 * @description: 拷贝到剪切板2
 * @param {*}
 * @return {*}
 * @author: 舒
 */
export function copyToClipboard(text) {
    // 创建一个空的 textarea 元素
    const textarea = document.createElement('textarea');

    // 将要复制的文本设置为 textarea 的值
    textarea.value = text;

    // 将 textarea 添加到文档中
    document.body.appendChild(textarea);

    // 选择 textarea 中的文本
    textarea.select();

    // 执行浏览器的复制命令
    document.execCommand('copy');

    // 删除 textarea 元素
    document.body.removeChild(textarea);
}

/**
 * @description: 生成一个用不重复的ID
 * @param {*}
 * @return {*}
 * @author: 舒
 */
export function getUuid(randomLength) {
    return Number(Math.random().toString().substr(2, randomLength) + Date.now()).toString(36);
}

/**
 * @description:获取url参数
 * @param {*} name
 * @return {*}
 * @author: 舒
 */
export function getQueryString(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}

/**
 * @description: 随机颜色
 * @param {*}
 * @return {*}
 * @author: 舒
 */
export const createRandomItemStyle = () => {
    return 'rgb(' + [Math.round(Math.random() * 180), Math.round(Math.random() * 360), Math.round(Math.random() * 360)].join(',') + ')';
};

/**
 * @description: 获取连接参数值
 * @param {*}
 * @return {*}
 * @author: 舒
 */
export function getUrlParams(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const r = window.location.search.substr(1).match(reg);
    if (r !== null) {
        return unescape(r[2]).replace('/', '');
    }
    return null;
}

/**
 * @description: 最多保留两位小数
 * @param {*}
 * @return {*}
 * @author: 舒
 */
export function formatMomey(num) {
    return Math.round(num * 100) / 100;
}

/**
 * @description: 深拷贝
 * @param {*}
 * @return {*}
 * @author: 舒
 */
export function deepCopy(obj) {
    return cloneDeep(obj);
}
// 随机唯一ID
export function randomID() {
    return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, (c) => {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16).toUpperCase();
    });
}

/**
 * @description: base64编码
 * @param {*} params - 要编码的字符串
 * @return {*} - 编码后的base64字符串
 * @author: 舒
 */
export const sTob = (params) => {
    const base64Str = btoa(unescape(encodeURIComponent(params)));
    return base64Str;
};
/**
 * @description: base64解码 (浏览器环境)
 * @param {string} params - 要解码的base64字符串
 * @return {string} - 解码后的普通文本字符串
 */
export const bTos = (params) => {
    const decStr = decodeURIComponent(escape(atob(params)));
    return decStr;
};

/**
 * @description: 判断是否是base64
 * @param {*}
 * @return {*}
 * @author: 舒
 */
export const isBase64 = (str) => {
    if (str === '' || str.trim() === '') {
        return false;
    }
    try {
        return btoa(atob(str)) === str;
    } catch (err) {
        return false;
    }
};

// 校验手机号码
export const isPhone = (val) => {
    var patrn = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
    if (!patrn.test(val) || val === '') {
        return false;
    } else {
        return true;
    }
};

export function getFileTypeFromUrl(url) {
    // 使用正则表达式从链接中提取文件后缀
    const extension = url.split('.').pop().toLowerCase();

    // 常见的视频文件后缀
    const videoExtensions = ['mp4', 'avi', 'mkv', 'mov', 'wmv'];

    // 常见的图片文件后缀
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

    // 常见的音频文件后缀
    const audioExtensions = ['mp3', 'wav', 'ogg', 'flac', 'aac'];

    // 检查后缀是否属于视频、图片或音频类型
    if (videoExtensions.includes(extension)) {
        return 'video';
    } else if (imageExtensions.includes(extension)) {
        return 'image';
    } else if (audioExtensions.includes(extension)) {
        return 'audio';
    } else {
        // 如果不属于以上任何一种类型，返回文件后缀
        return extension;
    }
}

//数组转字符串
export const convertArrayToString = (value) => {
    return Array.isArray(value) ? value.join(',') : String(value);
};
/**
 * @description: 设置自适应大小
 * @param {*}
 * @return {*}
 * @author: 舒
 */
export function sizeRem(size) {
    const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return 0;
    const fontSize = clientWidth / 1920;
    return size * fontSize;
}
