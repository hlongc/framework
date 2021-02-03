<template>
  <div class="chart" ref="wrapperRef">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, nextTick, reactive, toRefs } from 'vue'

interface PieItem {
  name: string;
  value: number;
  color: string;
  angle?: [number, number];
  radian?: [number, number];
}

interface ReactiveProps {
  pie: PieItem[];
}

export default defineComponent({
  name: 'chart',
  setup () {
    console.log('setup')
    const wrapperRef = ref<HTMLDivElement | null>(null)
    const canvasRef = ref<HTMLCanvasElement | null>(null)
    const data = reactive<ReactiveProps>({
      pie: [
        { name: '香蕉', value: 15, color: 'yellow' },
        { name: '荔枝', value: 10, color: 'brown' },
        { name: '草莓', value: 20, color: 'pink' },
        { name: '苹果', value: 9, color: 'red' },
        { name: '哈密瓜', value: 16, color: 'orange' }
      ]
    })
    let centerX: number
    let centerY: number
    function draw () {
      if (canvasRef.value) {
        const canvas = canvasRef.value
        const ctx = canvas.getContext('2d') // 获得绘画上下文
        if (!ctx) return
        ctx.translate(centerX, centerY) // 把中心位置当做起点
        const radius = Math.min(centerX, centerY) * 0.9 // 设置半径，取宽高最小值一半的90%
        const pie = data.pie
        const total = pie.reduce((total, current) => total + current.value, 0) // 求和
        const r = Math.PI / 180
        let currentTotalAngle = 0
        pie.forEach(item => {
          const curAngle = (item.value / total) * 360 // 当前项的角度
          const curEndAngle = currentTotalAngle + curAngle // 当前项结束的弧度
          item.angle = [currentTotalAngle, curEndAngle]
          item.radian = [currentTotalAngle * r, curEndAngle * r]
          currentTotalAngle += curAngle
        })

        pie.forEach(item => {
          ctx.beginPath()
          ctx.moveTo(0, 0)
          ctx.fillStyle = item.color
          if (item.radian) {
            const startRadian = item.radian[0] - Math.PI / 2
            const endRadian = item.radian[1] - Math.PI / 2
            ctx.arc(0, 0, radius, startRadian, endRadian)
            ctx.fill()
          }
        })
      }
    }
    onMounted(() => {
      if (wrapperRef.value && canvasRef.value) {
        const { width, height } = wrapperRef.value.getBoundingClientRect()
        canvasRef.value.width = width
        centerX = width / 2
        canvasRef.value.height = height
        centerY = height / 2
        nextTick(draw)
      }
    })
    return {
      wrapperRef,
      canvasRef,
      ...toRefs(data)
    }
  }
})
</script>
<style lang="less" scoped>
.chart {
  width: 500px;
  height: 350px;
}
</style>
