<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  import ChartResize from './ChartResize'

  export default {
    mixins: [ChartResize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '200px'
      },
      chartData: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id))

        this.chart.setOption(this.chartData)
      }
    }
  }
</script>
