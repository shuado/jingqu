/*
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-27 23:28:22
 * @Description:
 */
/*
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-27 22:31:57
 * @Description:
 */
import JTRequest from '../index';

import { prefix } from '@/config/api';

const prefixUrl = prefix;

export function uploadList(data) {
    return JTRequest.post({
        url: prefixUrl + '/refundOrder/upload',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data,
    });
}
