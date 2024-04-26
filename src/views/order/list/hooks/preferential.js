const releaseStatus = [
    {
        label: '待发布',
        value: 0,
        color: '#fbb452',
    },
    {
        label: '发布中',
        value: 1,
        color: '#52C51A',
    },
    {
        label: '已下架',
        value: 2,
        color: '#FF4D50',
    },
];
//惠企政策

//校验
const validateAvueUeditor = (rule, value, callback) => {
    if (value === '<p><br></p>' || !value) {
        callback(new Error('内容不能为空'));
    } else {
        callback();
    }
};
const option = ref({
    index: true,
    searchShow: true,
    searchMenuSpan: 3,
    searchLabelWidth: 100,
    refreshBtn: true,
    menuAlign: 'center',
    saveBtnText: '发布',
    updateBtnText: '发布',
    emptyBtnText: '重置',
    editBtn: true,
    delBtn: false,
    align: 'left',
    columnBtn: false,
    labelWidth: 150,
    column: [
        {
            label: '政策ID',
            prop: 'id',
            overHidden: true,
            addDisplay: false,
            disabled: true,
            span: 14,
        },
        {
            label: '政策名称',
            prop: 'title',
            overHidden: true,
            span: 12,
            maxlength: 20,
            rules: [
                {
                    required: true,
                    message: '请输入标题',
                    trigger: 'blur',
                },
            ],
            searchLabelWidth: 120,
            search: true,
        },
        {
            label: '适用园区',
            prop: 'type',
            type: 'select',
            dicData: [
                {
                    label: '0000',
                    value: 0,
                },
                {
                    label: '11111',
                    value: 1,
                },
            ],
            rules: [
                {
                    required: true,
                    message: '请选择分类',
                    trigger: 'blur',
                },
            ],
        },
        {
            label: '状态',
            prop: 'status',
            type: 'select',
            dicData: releaseStatus,
            search: true,
            display: false,
            html: true,
            formatter: (row) => `<div class="status-flex"><div class="status-point" style="background-color: ${releaseStatus.find((r) => r.value === row.status)?.color}"></div>${releaseStatus.find((r) => r.value === row.status)?.label}</div>`,
        },
        {
            label: '发布时间',
            prop: 'updateTime',
            type: 'datetime',
            format: 'YYYY-MM-DD HH:mm:ss',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
            display: false,
            span: 20,
        },
        {
            label: '内容',
            prop: 'resourceTextDescription',
            component: 'AvueUeditor',
            customConfig: {
                MENU_CONF: {
                    lineHeight: {
                        lineHeightList: ['1', '1.5', '2', '2.5'],
                    },
                },
            },
            action: '/blade-resource/oss/endpoint/put-file',
            propsHttp: {
                url: 'link',
                name: 'name',
                res: 'data',
            },
            rules: [
                {
                    required: true,
                    message: '请输入内容',
                    trigger: 'blur',
                },
                { required: true, validator: validateAvueUeditor, trigger: 'blur' },
            ],
            span: 24,
            hide: true,
        },
    ],
});
export default function () {
    return { option };
}
