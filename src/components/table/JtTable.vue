<template>
    <div class="jt-table">
        <a-table ref="table" :key="tableData" size="large" :columns="props.columns" :data="tableData" :pagination="false" :only-current="true" v-bind="$attrs">
            <template v-for="item in props.columns" :key="item.title" #[item.slotName]="{ record, column, rowIndex }">
                <!-- 插槽 -->
                <slot :name="item.slotName" v-bind="{ rowIndex: rowIndex, record: record, column: column }">
                    <!-- 索引 序号 -->
                    <span v-if="item.slotName === 'index'">{{ pager.size * (pager.current - 1) + rowIndex + 1 }}</span>
                    <!--动态组件-->
                    <component :is="item.element" v-else-if="item.element" :key="item.slotName" v-model="record[item.dataIndex]" v-bind="item.binds || {}" v-on="item.events || {}">
                        <template v-if="item.element === 'a-select'">
                            <a-option
                                v-for="i of item.options"
                                :key="i.value || i.dictKey || i[item.props.value]"
                                :value="i.value || i.dictKey || i[item.props.value]"
                                :label="i.label || i.dictValue || i[item.props.label]"
                                :disabled="i.disabled || false"
                            />
                        </template>
                    </component>
                    <!-- 其他 -->
                    <span v-else :title="record[item.dataIndex]">{{ record[item.dataIndex] || '-' }}</span>
                </slot>
            </template>
        </a-table>
        <div v-show="props.total > 0 || pager.total > 0" class="pagination" :style="{ justifyContent: props.paginationLocation }">
            <a-pagination
                :total="modelValue !== null ? props.total : pager.total"
                :current="modelValue !== null ? props.current : pager.current"
                :page-size="modelValue !== null ? props.size : pager.size"
                v-bind="paginationTools"
                :page-size-options="props.pageSizeOptions"
                @change="handlePageChange"
                @page-size-change="handleSizeChange"
            />
            <span class="pagination-last">页</span>
        </div>
    </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue';

let props = defineProps({
    // 表格整体分页相关参数
    pager: {
        type: Object,
        default: () => {
            return {
                tableData: [], // 表格数据
                total: 0, // 数据总条数
                current: 1, // 当前页码
                size: 10, // 每页数据展示条数
            };
        },
    },

    // 表格数据
    modelValue: {
        type: Array || Object,
        default: () => {
            return null;
        },
    },
    // 表头列  常用类型使用在
    columns: {
        type: Array,
        default: () => {
            return [];
        },
    },

    // 数据总条数
    total: {
        type: Number,
        default: 0,
    },

    // 当前页码
    current: {
        type: Number,
        default: null,
    },

    // 每页展示条数
    size: {
        type: Number,
        default: null,
    },

    // 分页要使用的工具
    paginationTool: {
        type: String,
        default: 'show-total, show-jumper, show-page-size',
    },

    // 条数列表
    pageSizeOptions: {
        type: Array,
        default: () => {
            return [10, 20, 30, 40, 50];
        },
    },

    // 绑定的事件和要执行的方法名称
    events: {
        type: Object,
        default: () => {
            return { pageSizeChange: 'handleChange' };
        },
    },

    // 属性
    binds: {
        type: Object,
        default: () => {
            return { pageSizeChange: 'handleChange' };
        },
    },

    // 分页位置
    paginationLocation: {
        type: String,
        default: 'right',
    },
});
let emit = defineEmits(['update:modelValue', 'handlePageChange', 'handleSizeChange']);
// 表格数据
let tableData = computed({
    get() {
        return props.modelValue || props.pager.tableData;
    },
    set(value) {
        emit('update:modelValue', value);
    },
});

const isNull = (value) => {
    if (value === undefined || value === null || value === '') {
        return true;
    }
    return false;
};

watch(
    () => props.columns,
    (value) => {
        if (value) {
            value.forEach((item) => {
                if (isNull(item.ellipsis)) {
                    item.ellipsis = true;
                }
                if (isNull(item.tooltip)) {
                    item.tooltip = true;
                }
            });
        }
    },
    {
        deep: true,
        immediate: true,
    },
);
// 表格工具的添加
let paginationTools = computed(() => {
    let con = {};
    props.paginationTool.split(',').forEach((item) => {
        con[item.trim()] = true;
    });
    return con;
});

// 页码发生改变时
const handlePageChange = (current) => {
    emit('handlePageChange', current);
};

// 每页展示条数发生改变时
const handleSizeChange = (pageSize) => {
    emit('handleSizeChange', pageSize);
};

const table = ref(null);

const selectAll = () => {
    table.value.selectAll(status);
};
defineExpose({ selectAll, table });
</script>

<style lang="scss" scoped>
.jt-table {
    margin-top: 0 !important;
    padding-bottom: 50px;
    :deep(.arco-checkbox-icon) {
        border: 1px solid rgba(217, 217, 217, 1);
        border-width: 1px !important;
    }

    :deep(.arco-table-container) {
        border-radius: 0;
    }

    :deep(.arco-table-tr) {
        height: 53px;

        .arco-table-th {
            color: #333333;
            background-color: rgba(238, 241, 246, 1);
        }

        .arco-table-td {
            color: rgba(0, 0, 0, 0.647058823529412);
        }

        .arco-table-checkbox {
            width: 56px;
        }
    }

    .pagination {
        position: absolute;
        bottom: 0;
        right: 24px;
        display: flex;
        align-items: center;
        margin: 16px 0;

        :deep(.arco-pagination-item) {
            border: 1px solid rgba(217, 217, 217, 1);
            border-radius: 6px;

            .arco-icon {
                font-size: 14px;
                color: #000;
            }
        }

        :deep(.arco-pagination-item-active) {
            background-color: rgba(24, 144, 255, 1);
            color: #fff;
            border: none !important;
        }

        :deep(.arco-select-view-single) {
            border: 1px solid rgba(217, 217, 217, 1);
            background: none;
            border-radius: 6px;
            padding: 0 8px;

            .arco-select-view-suffix {
                padding-left: 4px;

                .arco-select-view-icon {
                    .arco-icon {
                        font-size: 14px;
                        color: #000;
                    }
                }
            }
        }

        :deep(.arco-pagination-jumper-input) {
            border: 1px solid rgba(217, 217, 217, 1);
            background: none;
            border-radius: 6px;
        }

        .pagination-last {
            width: 14px;
            margin-left: 8px;
        }
    }
}
</style>
