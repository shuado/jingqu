<!--
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-25 13:56:53
 * @Description:
-->
<template>
    <basic-container> <avue-crud ref="crudRef" v-model="form" :option="option" @row-save="rowSave" @row-update="rowUpdate" @row-del="rowDel" :data="data"></avue-crud> </basic-container>
</template>
<script setup>
//获取this
const option = ref(null);
const data = ref(null);
const form = ref({});
option.value = {
    index: true,
    column: [
        {
            label: '姓名',
            prop: 'name',
        },
        {
            label: '年龄',
            prop: 'sex',
        },
    ],
};
data.value = [
    // {
    //     name: '张三',
    //     sex: 12,
    // },
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
