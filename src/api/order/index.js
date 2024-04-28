/*
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-28 10:30:16
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
export function getDicts(data) {
    return JTRequest.get({
        url: prefixUrl + '/dicts/all',
    });
}
