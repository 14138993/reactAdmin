import React, { Component } from 'react'
import './index.less'

import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
export class AdminIndex extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  // componentDidMount() {
  //   return

  //   // 基于准备好的dom，初始化echarts实例
  //   var myChart = echarts.init(this.refs.chatMain);

  //   // 绘制图表
  //   myChart.setOption({
  //     title: {
  //       text: 'Confidence Band',
  //       subtext: 'Example in MetricsGraphics.js',
  //       left: 'center'
  //     },
  //     tooltip: {
  //       trigger: 'axis',
  //       axisPointer: {
  //         type: 'cross',
  //         animation: false,
  //         label: {
  //           backgroundColor: '#ccc',
  //           borderColor: '#aaa',
  //           borderWidth: 1,
  //           shadowBlur: 0,
  //           shadowOffsetX: 0,
  //           shadowOffsetY: 0,
  //           textStyle: {
  //             color: '#222'
  //           }
  //         }
  //       },
  //       formatter: function (params) {
  //         return params[2].name + '<br />' + params[2].value;
  //       }
  //     },
  //     grid: {
  //       left: '3%',
  //       right: '4%',
  //       bottom: '3%',
  //       containLabel: true
  //     },
  //     xAxis: {
  //       type: 'category',
  //       data: data.map(function (item) {
  //         return item.date;
  //       }),
  //       axisLabel: {
  //         formatter: function (value, idx) {
  //           var date = new Date(value);
  //           return idx === 0 ? value : [date.getMonth() + 1, date.getDate()].join('-');
  //         }
  //       },
  //       splitLine: {
  //         show: false
  //       },
  //       boundaryGap: false
  //     },
  //     yAxis: {
  //       axisLabel: {
  //         formatter: function (val) {
  //           return (val - base) * 100 + '%';
  //         }
  //       },
  //       axisPointer: {
  //         label: {
  //           formatter: function (params) {
  //             return ((params.value - base) * 100).toFixed(1) + '%';
  //           }
  //         }
  //       },
  //       splitNumber: 3,
  //       splitLine: {
  //         show: false
  //       }
  //     },
  //     series: [{
  //       name: 'L',
  //       type: 'line',
  //       data: data.map(function (item) {
  //         return item.l + base;
  //       }),
  //       lineStyle: {
  //         normal: {
  //           opacity: 0
  //         }
  //       },
  //       stack: 'confidence-band',
  //       symbol: 'none'
  //     }, {
  //       name: 'U',
  //       type: 'line',
  //       data: data.map(function (item) {
  //         return item.u - item.l;
  //       }),
  //       lineStyle: {
  //         normal: {
  //           opacity: 0
  //         }
  //       },
  //       areaStyle: {
  //         normal: {
  //           color: '#ccc'
  //         }
  //       },
  //       stack: 'confidence-band',
  //       symbol: 'none'
  //     }, {
  //       type: 'line',
  //       data: data.map(function (item) {
  //         return item.value + base;
  //       }),
  //       hoverAnimation: false,
  //       symbolSize: 6,
  //       itemStyle: {
  //         normal: {
  //           color: '#c23531'
  //         }
  //       },
  //       showSymbol: false
  //     }]
  //   });
  // }
  render() {
    return (
      <div className='adminIndex'>
          this in AdminIndex
          <div className='chatMain' ref='chatMain'></div>
      </div>
    )
  }
}

export default AdminIndex