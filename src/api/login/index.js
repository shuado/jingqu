/*
 * @Description:
 * @Date: 2022-07-11 14:36:01
 * @FilePath: /quzhou-carbon/src/api/login/index.js
 */
import JTRequest from '../index';

import { prefix } from '@/config/api';

const prefixUrl = prefix;

/**
 * 登录
 * @param
 * 相关参数
 * @returns {Promise<unknown>}
 */
export function login(data) {
    return JTRequest.post({
        url: prefixUrl + '/login/login',
        data,
    });
}

/**
 * 免密登录
 * @param
 * 相关参数
 * @returns {Promise<unknown>}
 */
export function loginTo(data) {
    return JTRequest.post({
        url: prefixUrl + '/login/loginTo',
        data,
    });
}

/**
 * 获取验证码
 * @param
 * 相关参数
 * @returns {Promise<unknown>}
 */
export function getCode(data) {
    return JTRequest.get({
        url: prefixUrl + '/login/getCode',
        data,
    });
}

/**
 * 刷新token
 * @param
 * 相关参数
 * @returns {Promise<unknown>}
 */
export function flushToken() {
    return JTRequest.get({
        url: prefixUrl + '/login/flushToken',
    });
}
