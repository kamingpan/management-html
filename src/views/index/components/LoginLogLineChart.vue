<template>
  <div :class="className" :style="{height: height, width: width}"></div>
</template>

<script>
import echarts from 'echarts'
import {
  debounce
} from '@/utils'
import {
  getLastMonthLoginLog
} from '@/api/system/admin-login-log'

require('echarts/theme/macarons') // echarts theme

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      sidebarElement: null
    }
  },
  mounted() {
    this.initChart()

    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)

      window.addEventListener('resize', this.__resizeHandler)
    }

    // 监听侧边栏的变化
    this.sidebarElement = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElement && this.sidebarElement.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    this.sidebarElement && this.sidebarElement.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions(dates, loginCounts) {
      this.chart.setOption({
        visualMap: [{
          show: false,
          type: 'continuous',
          seriesIndex: 0
        }],
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        xAxis: {
          data: dates,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        yAxis: {
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        legend: {
          data: ['登录次数']
        },
        series: [{
          name: '登录次数',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: loginCounts,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      getLastMonthLoginLog().then(data => {
        const dates = []
        const loginCounts = []

        // 遍历集合，将日期和登录次数分别放置到两个列表中
        for (const key in data) {
          dates.push(key)
          loginCounts.push(data[key])
        }

        this.setOptions(dates, loginCounts)
      }).catch(() => {
      })
    }
  }
}
</script>
