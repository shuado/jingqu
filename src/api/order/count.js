/*
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-27 22:31:57
 * @Description:
 */
import JTRequest from '../index';

import { prefix } from '@/config/api';

const prefixUrl = prefix;
export function getData(data) {
    return JTRequest.post({
        url: prefixUrl + '/goodsOrder/overview',
        data,
    });
}
