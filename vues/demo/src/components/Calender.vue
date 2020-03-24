<template>
  <div class="calender-container" v-show-outside>
    <input type="text" :value="formateDate">
    <div class="calender-content" v-if="isShowCalender">
      <div class="calender-header">
        <span @click="prevYear" title="上一年">&lt;</span>
        <span @click="prevMonth" title="上一月">&lt;&lt;</span>
        <span>{{boxDate.year}}年</span>
        <span>{{boxDate.month}}月</span>
        <span @click="nextMonth" title="下一月">&gt;&gt;</span>
        <span @click="nextYear" title="下一年">&gt;</span>
      </div>
      <div class="calender-body">
        <div class="row">
          <span v-for="i in week" class="cell" :key="i">{{ i }}</span>
        </div>
        <div v-for="i in 6" :key="i" class="row">
          <span
            v-for="j in 7"
            :key="j"
            class="cell"
            @click="select(allDate[(i - 1) * 7 + j - 1])"
            :class="[
              { today: isToday(allDate[(i - 1) * 7 + j - 1]) },
              { currentMonth: !isCurrentMonth(allDate[(i - 1) * 7 + j - 1]) },
              { select: isSelect(allDate[(i - 1) * 7 + j - 1]) }
            ]"
          >
            {{ allDate[(i - 1) * 7 + j - 1].getDate() }}
          </span>
        </div>
      </div>
      <div class="calender-footer">
        <span @click="selectToday">今天</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calender',
  props: {
    value: {
      type: Date,
      default: () => new Date(),
      required: false
    }
  },
  directives: {
    showOutside: {
      bind (el, binding, vnode) {
        const handle = (e) => {
          if (el.contains(e.target)) {
            if (!vnode.context.isShowCalender) vnode.context.focus()
          } else {
            if (vnode.context.isShowCalender) vnode.context.blur()
          }
        }
        el.handle = handle
        document.addEventListener('click', handle)
      },
      unbind (el, binding, vnode) {
        document.removeEventListener('click', el.handle)
      }
    }
  },
  computed: {
    boxDate () {
      let { year, month } = this.time
      if (++month <= 9) month = '0' + month
      return { year, month }
    },
    formateDate () {
      let { year, month, day } = this.getYearMonthDay(this.value)
      if (++month <= 9) month = '0' + month
      if (day <= 9) day = '0' + day
      return `${year}-${month}-${day}`
    },
    allDate () {
      const { year, month } = this.getYearMonthDay(this.getDate(this.time.year, this.time.month))
      const currentFirst = this.getDate(year, month)
      const before = currentFirst.getDay() // 计算出当月1号是周几
      const ONE_DAY = 60 * 60 * 1000 * 24
      const firstDay = currentFirst - before * ONE_DAY
      const res = []
      for (let i = 0; i < 42; i++) {
        res.push(new Date(firstDay + i * ONE_DAY))
      }
      return res
    }
  },
  data () {
    const { year, month } = this.getYearMonthDay(this.value)
    return {
      time: { year, month },
      week: ['日', '一', '二', '三', '四', '五', '六'],
      isShowCalender: false
    }
  },
  methods: {
    isSelect (date) {
      const { year, month, day } = this.getYearMonthDay(this.value)
      const { year: y, month: m, day: d } = this.getYearMonthDay(date)
      return year === y && month === m && day === d
    },
    isToday (date) {
      const { year, month, day } = this.getYearMonthDay(new Date())
      const { year: y, month: m, day: d } = this.getYearMonthDay(date)
      return year === y && month === m && day === d
    },
    isCurrentMonth (date) {
      const { year, month } = this.getYearMonthDay(this.getDate(this.time.year, this.time.month))
      const { year: y, month: m } = this.getYearMonthDay(date)
      return year === y && month === m
    },
    getYearMonthDay (date = new Date()) {
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      return { year, month, day }
    },
    getDate (year, month, day = 1) {
      return new Date(year, month, day)
    },
    selectToday () {
      this.select(new Date())
    },
    select (date) {
      this.$emit('input', date)
      this.time = this.getYearMonthDay(date, true)
      this.blur()
    },
    focus () {
      this.isShowCalender = true
    },
    blur () {
      this.isShowCalender = false
    },
    prevMonth () {
      const { year, month } = this.time
      const d = this.getDate(year, month)
      d.setMonth(d.getMonth() - 1)
      this.time = this.getYearMonthDay(d)
    },
    nextMonth () {
      const { year, month } = this.time
      const d = this.getDate(year, month)
      d.setMonth(d.getMonth() + 1)
      this.time = this.getYearMonthDay(d)
    },
    prevYear () {
      const { year, month } = this.time
      const d = this.getDate(year, month)
      d.setYear(d.getFullYear() - 1)
      this.time = this.getYearMonthDay(d)
    },
    nextYear () {
      const { year, month } = this.time
      const d = this.getDate(year, month)
      d.setYear(d.getFullYear() + 1)
      this.time = this.getYearMonthDay(d)
    }
  }
}
</script>
<style lang="stylus">
$size = 32px
.calender-container
  position relative
  width 200px
  height 20px
  .calender-content
    overflow hidden
    position absolute
    top 30px
    left 0
    box-shadow 2px 2px 2px pink, -2px -2px 2px pink
    background-color #FFF
    .calender-header
      display flex
      justify-content space-around
      span
        cursor pointer
    .calender-body
      .title
        display flex
        span
          flex 1
          justify-content center
          align-items center
      .row
        width $size * 7
        overflow hidden
        .cell
          display inline-block
          float left
          width $size
          text-align center
          height $size
          line-height $size
          color #333
          cursor pointer
          &.today
            background-color #EC281B
            color #fff
          &.currentMonth
            color #ccc
          &.select
            color skyblue
    .calender-footer
      text-align center
      span
        cursor pointer
</style>
