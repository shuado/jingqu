<!--
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-25 13:56:53
 * @Description:
-->
<template>
    <basic-container>
        <avue-crud ref="crudRef" v-model="form" :option="option" @row-save="rowSave" @row-update="rowUpdate" @row-del="rowDel" :data="data"> </avue-crud>
    </basic-container>
</template>
<script setup>
import useOption from './hooks/useOption';
//获取this
const option = useOption();
const data = ref(null);
const form = ref({});

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
