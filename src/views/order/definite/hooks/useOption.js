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
    refreshBtn: false,
    menuAlign: 'center',
    emptyBtnText: '重置',
    editBtn: false,
    viewBtn: true,
    addBtn: false,
    dialogFullscreen: true,
    delBtn: false,
    border: true,
    align: 'left',
    menuWidth: 100,
    columnBtn: false,
    labelWidth: 150,
    overHidden: true,
    column: [
        {
            label: '订单号',
            prop: 'orderNum',
            width: 200,
        },
        {
            label: '票号',
            width: 200,
            prop: 'ticketCollectionNum',
        },

        {
            label: '产品',
            width: 200,
            prop: 'product',
        },

        {
            label: '购票人',
            width: 100,
            prop: 'ticketBuyerUserName',
        },
        {
            label: '购票人手机号',
            width: 200,

            prop: 'ticketBuyerUserPhone',
        },
        {
            label: '购票人身份证',
            width: 200,

            prop: 'ticketBuyerUserId',
        },

        {
            label: '游客姓名',
            width: 100,
            prop: 'touristUserName',
        },

        {
            label: '游客身份证',
            width: 200,

            prop: 'touristUserName',
        },
        {
            label: '游客手机',
            width: 200,

            prop: 'touristUserPhone',
        },

        {
            label: '渠道',
            width: 200,
            prop: 'channelCn',
        },

        {
            label: '收款方式',
            width: 200,
            prop: 'paymentMethodCn',
        },

        {
            label: '票价',

            prop: 'fare',
        },
        {
            label: '折后价',

            prop: 'discountedPrice',
        },
        {
            label: '结算价',

            prop: 'settlementPrice',
        },

        {
            label: '订单状态',
            prop: 'orderStatusCn',
        },
        {
            label: '门票状态',
            prop: 'ticketStatusCn',
        },

        {
            label: '下单时间',
            width: 200,
            prop: 'orderTime',
            type: 'date',
            format: 'YYYY-MM-DD HH:mm:ss',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },

        {
            label: '游玩时间',
            prop: 'playtime',
            width: 200,
            type: 'date',
            format: 'YYYY-MM-DD HH:mm:ss',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },
        {
            label: '预约时间',
            prop: 'appointmentTime',
            width: 200,
            type: 'date',
            format: 'YYYY-MM-DD HH:mm:ss',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },
        {
            label: '最近核销时间',
            prop: 'recentWriteOffTime',
            width: 200,
            type: 'date',
            format: 'YYYY-MM-DD HH:mm:ss',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },
        {
            label: '退款时间',
            prop: 'refundTime',
            width: 200,
            type: 'date',
            format: 'YYYY-MM-DD HH:mm:ss',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },

        {
            label: '分销商',
            width: 200,
            prop: 'distributor',
        },
        {
            label: '售票员',
            width: 200,
            prop: 'conductor',
        },

        {
            label: '打印次数',

            prop: 'printNum',
        },

        {
            label: '打印来源',
            width: 200,

            prop: 'printSource',
        },
        {
            label: '打印时间',
            width: 200,
            prop: 'printTime',
            type: 'date',
            format: 'YYYY-MM-DD HH:mm:ss',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },
        {
            label: '卡号',

            width: 200,
            prop: 'cardNum',
        },
        {
            label: '订单备注',
            prop: 'remarks',
        },
    ],
};
export default function () {
    return option;
}
