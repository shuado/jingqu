/*
 * @Author: 舒 shd_cn@163.com
 * @Date: 2023-09-01 16:56:57
 * @Description: hooks文件导出
 */

const hooks = import.meta.glob('./*.js', { eager: true, import: 'default' });

function convertToCamelCase(str) {
    // 使用正则表达式将字符串中的相邻单词的首字母大写
    const camelCaseStr = str
        .split('/')
        .pop() // 获取文件名部分
        .replace(/\.js$/, '') // 去掉文件扩展名
        .split(/[-_]/)
        .map((word, index) => {
            // 将首字母小写，除了第一个单词
            if (index === 0) {
                return word;
            } else {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
        })
        .join('');

    // 将第一个单词的首字母小写
    return camelCaseStr.charAt(0).toLowerCase() + camelCaseStr.slice(1);
}

let exportModule = {};

for (const key in hooks) {
    const newName = convertToCamelCase(key);
    exportModule[newName] = hooks[key];
}

export const { usePagingOption } = exportModule;
