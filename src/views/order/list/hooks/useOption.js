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
            prop: 'orderNum',
            width: 200,
        },
        {
            label: '取票号',
            width: 200,

            prop: 'ticketCollectionNum',
        },
        {
            label: '姓名',
            width: 200,
            prop: 'ticketBuyerUserName',
        },
        {
            label: '手机',
            width: 200,

            prop: 'ticketBuyerUserPhone',
        },
        {
            label: '单价',

            prop: 'price',
        },
        {
            label: '总数',

            prop: 'total',
        },
        {
            label: '退票数',

            prop: 'refundsNum',
        },
        {
            label: '核销数',

            prop: 'writeOffNum',
        },
        {
            label: '收款方式',
            prop: 'paymentMethodCn',
        },
        {
            label: '产品',
            width: 200,
            prop: 'product',
        },
        {
            label: '总金额',

            prop: 'totalAmount',
        },
        {
            label: '实收金额',

            prop: 'actualAmountReceived',
        },
        {
            label: '渠道',
            width: 200,
            prop: 'channelCn',
        },
        {
            label: '下单时间',
            prop: 'orderTime',
            type: 'date',
            format: 'YYYY-MM-DD HH:mm:ss',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },
        {
            label: '订单状态',
            prop: 'orderStatusCn',
        },
        {
            label: '分销商',
            prop: 'distributor',
        },
        {
            label: '支付流水号',
            width: 200,

            prop: 'serialNum',
        },
        {
            label: '营销活动',
            width: 200,
            prop: 'marketingActivitiesCn',
        },
        {
            label: '活动名称',
            width: 200,
            prop: 'activityName',
        },
        {
            label: '开票状态',
            prop: 'invoiceStatusCn',
        },
        {
            label: '备注',
            prop: 'remarks',
        },
    ],
};
export default function () {
    return option;
}
