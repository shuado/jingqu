<!--
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-25 13:56:53
 * @Description:
-->
<template>
    <basic-container>
        <el-upload ref="upload" :limit="1" accept=".xls,.xlsx" :disabled="uploadLoading" :show-file-list="false" :on-exceed="handleExceed" :auto-upload="true" :http-request="httpRequest">
            <el-button :icon="Upload" :loading="uploadLoading" style="margin-bottom: 12px" type="success" @click="importClick">导入</el-button>
        </el-upload>
        <seek ref="seekRef" @seek-click="search">
            <advanced-search @search-click="searchClick" />
        </seek>
        <avue-crud ref="crudRef" v-model="form" :table-loading="loading" :page="pageOption" :option="option" :data="data" @current-change="pageOption.currentChange" @size-change="pageOption.sizeChange"> </avue-crud>
    </basic-container>
</template>
<script setup>
import { Upload } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { uploadList, getList } from '@/api/order/refund.js';

const seek = defineAsyncComponent(() => import('./components/seek.vue'));
const AdvancedSearch = defineAsyncComponent(() => import('./components/advanced-search.vue'));
import useOption from './hooks/useOption';
//获取this
const option = useOption();
const data = ref([]);
const form = ref({});
let loading = ref(false);

const pageOption = usePagingOption();

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
            pageOption.change();
        })
        .catch((err) => {
            ElMessage.error('上传失败');
        })
        .finally((_) => {
            uploadLoading.value = false;
        });
};

const searchData1 = ref({});
const searchData2 = ref({});

const seekRef = ref(null);

pageOption.change = () => {
    let searchData = {};
    if (seekRef.value && seekRef.value.isExpand) {
        searchData = {
            ...searchData2.value,
        };
    } else {
        searchData = {
            ...searchData1.value,
        };
    }
    const params = {
        ...searchData,
        current: pageOption.currentPage,
        size: pageOption.pageSize,
    };
    loading.value = true;
    getList(params)
        .then((res) => {
            data.value = res.data;
            pageOption.total = res.total;
        })
        .finally(() => {
            loading.value = false;
        });
};

pageOption.change();

/**
 * @Description: 搜索
 * @param {*} val
 * @author: 舒
 * @return {*}
 */
const search = (val) => {
    searchData1.value = val;
    pageOption.change();
};
const searchClick = (val) => {
    searchData2.value = val;
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
</script>
<style lang="scss" scoped></style>
