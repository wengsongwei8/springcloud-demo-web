<template>
  <div class='chart-container'>
    <chart height='100%' width='100%' :chartData="chartData" ></chart>
  </div>
</template>

<script>
import Chart from '@/components/Echart'

export default {
  name: 'gaugeChart',
  components: { Chart },
  data() {
    return {
      chartData: {
        tooltip : {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            detail: {formatter: '{value}%'},
            data: [{value: 50, name: '完成率'}]
          }
        ]
      }
    }
  },
}
</script>

<style scoped>
.chart-container{
  position: relative;
  padding:20px;
  width: 100%;
  height:85vh;
}
</style>

