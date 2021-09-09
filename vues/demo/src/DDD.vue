<template>
  <div id="main"></div>
</template>

<script>
import * as echarts from 'echarts';
import { Scatter3DChart } from 'echarts-gl/charts';
import { Grid3DComponent } from 'echarts-gl/components';

echarts.use([Scatter3DChart, Grid3DComponent]);
export default {
  name: 'DDD',
  mounted() {
    this.paint()
  },
  methods: {
    paint() {
      var chart = echarts.init(document.getElementById('main'));
      chart.setOption({
        grid3D: {},
        xAxis3D: {},
        yAxis3D: {},
        zAxis3D: {},
        series: [{
            type: 'scatter3D',
            symbolSize: 50,
            data: [[-1, -1, -1], [0, 0, 0], [1, 1, 1]],
            itemStyle: {
                opacity: 1
            }
        }]
      })
    }
  }
}
</script>

<style>
#main {
  width: 500px;
  height: 300px;
}
</style>