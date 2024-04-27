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
            label: '取票号',
            width: 200,
            type: 'number',
            prop: 'id2',
        },
        {
            label: '姓名',
            width: 200,
            prop: 'id3',
        },
        {
            label: '手机',
            width: 200,
            type: 'number',
            prop: 'id4',
        },
        {
            label: '单价',
            type: 'number',
            prop: 'id5',
        },
        {
            label: '总数',
            type: 'number',
            prop: 'id6',
        },
        {
            label: '退票数',
            type: 'number',
            prop: 'id7',
        },
        {
            label: '核销数',
            type: 'number',
            prop: 'id8',
        },
        {
            label: '收款方式',
            prop: 'id9',
        },
        {
            label: '产品',
            width: 200,
            prop: 'id10',
        },
        {
            label: '总金额',
            type: 'number',
            prop: 'id11',
        },
        {
            label: '实收金额',
            type: 'number',
            prop: 'id12',
        },
        {
            label: '渠道',
            width: 200,
            prop: 'id13',
        },
        {
            label: '下单时间',
            prop: 'id14',
            type: 'date',
            format: 'YYYY-MM-DD HH:mm:ss',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },
        {
            label: '订单状态',
            prop: 'id15',
        },
        {
            label: '分销商',
            prop: 'id16',
        },
        {
            label: '支付流水号',
            width: 200,
            type: 'number',
            prop: 'id17',
        },
        {
            label: '营销活动',
            width: 200,
            prop: 'id18',
        },
        {
            label: '活动名称',
            width: 200,
            prop: 'id19',
        },
        {
            label: '开票状态',
            prop: 'id20',
        },
        {
            label: '备注',
            prop: 'id21',
        },
    ],
};
export default function () {
    return option;
}
