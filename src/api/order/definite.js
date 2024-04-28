/*
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-27 23:28:23
 * @Description:
 */

import JTRequest from '../index';

import { prefix } from '@/config/api';

const prefixUrl = prefix;

export function uploadList(data) {
    return JTRequest.post({
        url: prefixUrl + '/goodsOrderDetail/upload',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data,
    });
}

export function getList(data) {
    return JTRequest.post({
        url: prefixUrl + '/goodsOrderDetail/list',
        data,
    });
}

// 获取售票员列表

export function getConductors() {
    return JTRequest.get({
        url: prefixUrl + '/goodsOrderDetail/getConductors',
    });
}

// 获取分销商列表

export function getDistributors() {
    return JTRequest.get({
        url: prefixUrl + '/goodsOrderDetail/getDistributors',
    });
}

// 获取产品列表

export function getProducts() {
    return JTRequest.get({
        url: prefixUrl + '/goodsOrderDetail/getProducts',
    });
}
