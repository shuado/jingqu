/*
 * @Author: 舒 shd_cn@163.com
 * @Date: 2023-09-01 16:18:58
 * @Description: 分页配置
 */

export default function () {
    const pagingOption = reactive({
        currentPage: 1,
        pageSize: 10,
        current: 1,
        size: 10,
        total: 1,
        layout: 'total, sizes, prev, pager, next, jumper',
        change: () => {},
        currentChange: (currentPage) => {
            pagingOption.currentPage = currentPage;
        },
        sizeChange: (pageSize) => {
            pagingOption.pageSize = pageSize;
        },
    });
    watch(
        () => ({ currentPage: pagingOption.currentPage, pageSize: pagingOption.pageSize }),
        (newVal) => {
            pagingOption.current = newVal.currentPage;
            pagingOption.change();
        },
    );
    return pagingOption;
}
