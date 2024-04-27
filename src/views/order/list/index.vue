<!--
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-25 13:56:53
 * @Description:
-->
<template>
    <basic-container>
        <seek />
        <avue-crud ref="crudRef" v-model:page="pageOption" v-model="form" :option="option" :data="data" @size-change="sizeChange"> </avue-crud>
    </basic-container>
</template>
<script setup>
import seek from './components/seek.vue';
import useOption from './hooks/useOption';
//获取this
const option = useOption();
const data = ref(null);
const form = ref({});
const pageOption = usePagingOption();

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
