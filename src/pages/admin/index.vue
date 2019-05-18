<template>
<div id="index">
<el-container>
  <el-aside width="400px"style="background-color:#d2f3e0" >
  <div id="SalesVolumeChart" :style="{width: '300px', height: '300px'}"></div>
<div id="viewsChart" :style="{width: '300px', height: '300px'}"></div>
<div id="saleWordCloud" :style="{width: '300px', height: '300px'}"></div>
  </el-aside>
  <el-main>Main</el-main>
</el-container>

</div>

</template>
<script>
require('echarts')
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
//引入词云
require('echarts-wordcloud');
export default {
  name: 'index',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let SalesVolumeChart = echarts.init(document.getElementById('SalesVolumeChart'));
      let viewsChart=echarts.init(document.getElementById('viewsChart'));
      let saleWordCloud=echarts.init(document.getElementById('saleWordCloud'));
      // 绘制销售图表
      SalesVolumeChart.setOption({
        title: { text: '上个月销量' },
       series:[{
                name:'销售量',
                type:'pie',    
                radius:'60%', 
                data:[
                    {value:500,name:'生活用书'},
                    {value:200,name:'科技'},
                    {value:360,name:'文学'},
                    {value:100,name:'专业'},
                    {value:700,name:'艺术'},
                    {value:100,name:'儿童'},
                ]
            }]
      });
      // 绘制访问量图表
      viewsChart.setOption({
        title: { text: '上个月访问量' },
       series:[{
                name:'访问量',
                type:'pie',    
                radius:'60%', 
                data:[
                    {value:500,name:'IOS'},
                    {value:200,name:'ANDROID'},
                    {value:360,name:'WEB'},
                    {value:50,name:'OTHERS'},
                ]
            }]
      });
      //制作词云
      saleWordCloud.setOption({
title:{text :"评价最多"},
series: [
    {
   type: 'wordCloud',
        gridSize: 2,
        sizeRange: [12, 50],
        rotationRange: [-90, 90],
        shape: 'pentagon',
        textStyle: {
            normal: {
                color: function () {
                    return 'rgb(' + [
                            Math.round(Math.random() * 255),
                            Math.round(Math.random() * 255),
                            Math.round(Math.random() * 255)
                        ].join(',') + ')';
                }
            },
            emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
            }
        },
        data: [
            {
                name: '物流快',
                value: 10000,
            }, {
                name: '书的纸质太好了',
                value: 6181
            }, {
                name: '鸡你太美',
                value: 4386
            }, {
                name: '正版',
                value: 4055
            }, {
                name: '出版社',
                value: 2467
            }, {
                name: '太喜欢了',
                value: 2244
            }, {
                name: '五星好评',
                value: 1898
            }, {
                name: '都是水军',
                value: 1484
            }, {
                name: '顺丰包邮解君愁',
                value: 1112
            }, {
                name: '火箭总冠军🚀',
                value: 965
            }, {
                name: '杀人诛心',
                value: 847
            }, {
                name: '书店',
                value: 582
            }, {
                name: '文艺',
                value: 555
            }, {
                name: '狗逼林少辉',
                value: 550
            }, {
                name: '扣我血汗钱',
                value: 462
            }, {
                name: '毛不易',
                value: 366
            }, {
                name: '舒服了',
                value: 360
            }, {
                name: 'kindle',
                value: 282
            }, {
                name: '996.icu',
                value: 273
            }, {
                name: '带带大师兄 ',
                value: 273
            }, {
                name: '儒雅随和',
                value: 265
            }]
    }
    ]
      });
    }
  }
}
</script>