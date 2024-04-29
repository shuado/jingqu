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
    border: true,
    menuWidth: 100,
    refreshBtn: false,
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
            label: '退款号',
            prop: 'refundNum',
            width: 200,
        },
        {
            label: '订单号',
            width: 200,

            prop: 'orderNum',
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
            label: '渠道',
            width: 200,
            prop: 'channelCn',
        },

        {
            label: '退票数',

            prop: 'refundTotalNum',
        },

        {
            label: '退款金额',
            width: 200,

            prop: 'refundAmount',
        },
        {
            label: '退款费率',
            width: 200,

            prop: 'refundRate',
        },
        {
            label: '退款手续费',
            width: 200,

            prop: 'refundHandlingFee',
        },
        {
            label: '退款时间',
            width: 200,
            type: 'date',
            format: 'YYYY-MM-DD HH:mm:ss',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
            prop: 'refundTime',
        },

        {
            label: '退款人',
            width: 200,
            prop: 'refunder',
        },
    ],
};
export default function () {
    return option;
}
