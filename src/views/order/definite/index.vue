<!--
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-25 13:56:53
 * @Description:
-->
<template>
    <basic-container>
        <el-upload ref="upload" :limit="1" accept=".xls,.xlsx" :disabled="uploadLoading" :show-file-list="false" :on-exceed="handleExceed" :auto-upload="true" :http-request="httpRequest">
            <el-button :icon="Upload" :loading="uploadLoading" style="margin-left: 12px" type="success" @click="importClick">导入</el-button>
        </el-upload>
        <advanced-search @search-click="searchClick" />
        <calculate ref="calculateRef" />
        <avue-crud ref="crudRef" v-model="form" :page="pageOption" :option="option" :data="data" @current-change="pageOption.currentChange" @size-change="pageOption.sizeChange"> </avue-crud>
    </basic-container>
</template>
<script setup>
import { Upload } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { uploadList, getList } from '@/api/order/definite.js';
import useOption from './hooks/useOption';
import calculate from './components/calculate.vue';

import { getDicts } from '@/api/order/index';

getDicts().then((res) => {
    localStorage.setItem('dicts-all', JSON.stringify(res.data));
});

const AdvancedSearch = defineAsyncComponent(() => import('./components/advanced-search.vue'));

const handleExceed = (files, uploadFiles) => {
    ElMessage.warning(`最大可上传 ${files.length} 个文件`);
};

let uploadLoading = ref(false);
const httpRequest = (config) => {
    const { file } = config;
    console.log(file);

    // 创建formData
    const formData = new FormData();
    formData.append('fileName', file);
    uploadLoading.value = true;
    uploadList(formData)
        .then((res) => {
            ElMessage.success('上传成功');
        })
        .catch((err) => {
            ElMessage.error('上传失败');
        })
        .finally((_) => {
            uploadLoading.value = false;
        });
};

const searchData = ref({});
const pageOption = usePagingOption();

/**
 * @Description: 搜索
 * @author: 舒
 * @return {*}
 */

const searchClick = (val) => {
    searchData.value = val;
    pageOption.change();
};

/**
 * @Description: 导入
 * @author: 舒
 * @return {*}
 */
const importClick = () => {
    console.log('导入');
};

//获取this
const option = useOption();
const data = ref([]);
const form = ref({});
const calculateRef = ref(null);
pageOption.change = () => {
    const params = {
        ...searchData.value,
        current: pageOption.currentPage,
        size: pageOption.pageSize,
    };

    calculateRef.value.params = params;
    calculateRef.value.getData();
    calculateRef.value.pageData.fare = 0;
    calculateRef.value.pageData.discountedPrice = 0;
    calculateRef.value.pageData.settlementPrice = 0;
    getList(params).then((res) => {
        data.value = res.data;

        pageOption.total = res.total;
        console.log(pageOption);
        console.log('======');

        data.value.forEach((item) => {
            calculateRef.value.pageData.fare += item.fare || 0;
            calculateRef.value.pageData.discountedPrice += item.discountedPrice || 0;
            calculateRef.value.pageData.settlementPrice += item.settlementPrice || 0;
        });
    });
};
onMounted(() => {
    pageOption.change();
});
</script>
<style lang="scss" scoped></style>
