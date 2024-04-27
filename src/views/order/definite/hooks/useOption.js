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
const option = {
    index: true,
    searchShow: false,
    stripe: true,
    gridBtn: true,
    searchMenuSpan: 12,
    searchLabelWidth: 100,
    refreshBtn: true,
    menuAlign: 'center',
    emptyBtnText: '重置',
    editBtn: false,
    viewBtn: true,
    addBtn: false,
    dialogFullscreen: true,
    delBtn: false,
    align: 'left',
    columnBtn: false,
    labelWidth: 150,
    overHidden: true,
    column: [
        {
            label: '订单号',
            prop: 'id1',
            width: 200,
            type: 'number',
        },
        {
            label: '票号',
            width: 200,
            type: 'number',
            prop: 'id2',
        },

        {
            label: '产品',
            width: 200,
            prop: 'id10',
        },

        {
            label: '购票人',
            width: 100,
            prop: 'id3',
        },
        {
            label: '购票人手机号',
            width: 200,
            type: 'number',
            prop: 'id4',
        },
        {
            label: '购票人身份证',
            width: 200,
            type: 'number',
            prop: 'id41',
        },

        {
            label: '游客姓名',
            width: 100,
            prop: 'id31',
        },

        {
            label: '游客身份证',
            width: 200,
            type: 'number',
            prop: 'id42',
        },
        {
            label: '游客手机',
            width: 200,
            type: 'number',
            prop: 'id4',
        },

        {
            label: '渠道',
            width: 200,
            prop: 'id13',
        },

        {
            label: '收款方式',
            prop: 'id9',
        },

        {
            label: '票价',
            type: 'number',
            prop: 'id5',
        },
        {
            label: '折后价',
            type: 'number',
            prop: 'id51',
        },
        {
            label: '结算价',
            type: 'number',
            prop: 'id52',
        },

        {
            label: '订单状态',
            prop: 'id15',
        },
        {
            label: '门票状态',
            prop: 'id15',
        },

        {
            label: '下单时间',
            prop: 'id14',
            type: 'date',
            format: 'YYYY-MM-DD HH:mm:ss',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },

        {
            label: '游玩时间',
            prop: 'id141',
            type: 'date',
            format: 'YYYY-MM-DD HH:mm:ss',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },
        {
            label: '预约时间',
            prop: 'id142',
            type: 'date',
            format: 'YYYY-MM-DD HH:mm:ss',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },
        {
            label: '最近核销时间',
            prop: 'id143',
            type: 'date',
            format: 'YYYY-MM-DD HH:mm:ss',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },
        {
            label: '退款时间',
            prop: 'id144',
            type: 'date',
            format: 'YYYY-MM-DD HH:mm:ss',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },

        {
            label: '分销商',
            prop: 'id16',
        },
        {
            label: '售票员',
            prop: 'id161',
        },

        {
            label: '打印次数',
            type: 'number',
            prop: 'id6',
        },

        {
            label: '打印来源',
            width: 200,
            type: 'number',
            prop: 'id17',
        },
        {
            label: '打印时间',
            width: 200,
            prop: 'id18',
            type: 'date',
            format: 'YYYY-MM-DD HH:mm:ss',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },
        {
            label: '卡号',
            type: 'number',
            width: 200,
            prop: 'id19',
        },
        {
            label: '订单备注',
            prop: 'id21',
        },
    ],
};
export default function () {
    return option;
}
