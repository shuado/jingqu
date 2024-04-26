import { createI18n } from 'vue-i18n';

import elementEnLocale from 'element-plus/es/locale/lang/en';
import elementZhLocale from 'element-plus/es/locale/lang/zh-cn';
import enLocale from './en';
import zhLocale from './zh';
import AvueEnLocale from '@yolion/avue/lib/locale/lang/en';
import AvueZhLocale from '@yolion/avue/lib/locale/lang/zh';

export const messages = {
    en: {
        ...enLocale,
        ...AvueEnLocale,
        ...elementEnLocale,
    },
    'zh-cn': {
        ...zhLocale,
        ...AvueZhLocale,
        ...elementZhLocale,
    },
};
export const language = 'zh-cn';
export default createI18n({
    locale: language,
    messages,
});
