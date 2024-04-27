<!--
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-25 13:56:53
 * @Description:
-->
<template>
    <basic-container>
        <el-button :icon="Upload" style="margin-bottom: 12px" type="success" @click="importClick">导入</el-button>

        <seek @seek-click="search">
            <advanced-search @search-click="searchClick" />
        </seek>
        <avue-crud ref="crudRef" v-model:page="pageOption" v-model="form" :option="option" :data="data" @size-change="sizeChange"> </avue-crud>
    </basic-container>
</template>
<script setup>
import { Upload } from '@element-plus/icons-vue';

const seek = defineAsyncComponent(() => import('./components/seek.vue'));
const AdvancedSearch = defineAsyncComponent(() => import('./components/advanced-search.vue'));
import useOption from './hooks/useOption';
//获取this
const option = useOption();
const data = ref(null);
const form = ref({});
const pageOption = usePagingOption();

/**
 * @Description: 搜索
 * @param {*} val
 * @author: 舒
 * @return {*}
 */
const search = (val) => {
    console.log(val);
};

const searchClick = (val) => {
    console.log(val);
};

/**
 * @Description: 导入
 * @author: 舒
 * @return {*}
 */
const importClick = () => {
    console.log('导入');
};
/**
 * @description: 页数
 * @param {*} pageSize
 * @return {*}
 */
const sizeChange = (pageSize) => {
    pageOption.pageSize = pageSize;
    // onLoad(search.value);
};
// const page = ref({
//     total: 1,
// });
console.log(pageOption);
data.value = [
    {
        id: '张三',
        id1: 12,
    },
    // {
    //     name: '李四',
    //     sex: 13,
    // },
];
function rowSave(row, done, loading) {
    done(row);
}
function rowDel(row, index, done) {
    done(row);
}
function rowUpdate(row, index, done, loading) {
    done(row);
}
</script>
<style lang="scss" scoped></style>
