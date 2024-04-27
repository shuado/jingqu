/*
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-25 18:34:02
 * @Description:
 */
import { h, resolveDynamicComponent } from 'vue';

function Icon(props) {
    const Component = resolveDynamicComponent(props.icon);
    return h(Component);
}
export default Icon;
