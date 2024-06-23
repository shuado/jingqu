/*
 * @Description: 返回基础echart配置
 * @Date: 2022-03-25 14:31:36
 */

const columns = [];
for (let i = 0; i < 7; i++) {
    columns.push({
        type: 'rect',
        x: i * 20,
        shape: {
            x: 0,
            y: -40,
            width: 10,
            height: 80,
        },
        style: {
            fill: '#5470c6',
        },
        keyframeAnimation: {
            duration: 1000,
            delay: i * 200,
            loop: true,
            keyframes: [
                {
                    percent: 0.5,
                    scaleY: 0.1,
                    easing: 'cubicIn',
                },
                {
                    percent: 1,
                    scaleY: 1,
                    easing: 'cubicOut',
                },
            ],
        },
    });
}
export default function () {
    return {
        animation: true,
        // animationDuration: 3000,
        animationEasing: 'cubicOut',
        animationDelay: 1000,
        // graphic: {
        //     elements: [
        //         {
        //             type: 'group',
        //             left: 'center',
        //             top: 'center',
        //             children: columns,
        //         },
        //     ],
        // },
        // stateAnimation: {
        //   duration: 3000
        // },
        // animationDelayUpdate: function (idx) {
        //   return idx * 10
        // }
    };
}
