/*
 * @Description:
 * @Date: 2022-07-11 14:36:01
 * @FilePath: /double-carbon-cloud/src/api/public/index.js
 */
import JTRequest from '../request';
const prefixUrl = '/shuxi-dcc-monitor';

/**
 * 通用 行业下拉框
 * @param
 * 相关参数
 * @returns {Promise<unknown>}
 */
export function universalQueryIndustry(data) {
    return JTRequest.post({
        url: prefixUrl + '/universal/queryIndustry',
        data,
    });
}
