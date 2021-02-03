<template>
  <div class="iframe-container">
    <!-- <iframe src="https://bishengoffice.com/apps/editor/openEditor?callURL=aHR0cHM6Ly9iaXNoZW5nb2ZmaWNlLmNvbS9hcHBzL2FwaS9maWxlQWNsLzllYjA0YmVhLzE4NDI4MzY4NTQ0XzlmMzI4OTBj&sign=2159f7614811d538ca498db649577628" id="9eb04bea" frameborder="0" width="100%" height="100%"></iframe> -->
    <CommonHeader :user="user" />
    <!-- <img src="./sdfgn.jpg" height="400" /> -->
    <Chart v-if="false" />
    <Prosemirror />
    <ColumnList v-if="false" :data="list" />
    <SelfInput v-model="inputVal" placeholder="嘻嘻" />
    <input v-model="text" />
    <button @click="handleEvent">触发自定义事件</button>
    <header>
      <router-link to="/hello">hello</router-link>
      <router-link to="/world/1234">world</router-link>
    </header>
    <section>
      <ul>
        <li v-for="li in computedInfo" :key="li.id">
          {{ li.id }}: {{ li.name }} - {{ li.label }}
        </li>
      </ul>
      <router-view></router-view>
    </section>
    <footer>我是底部</footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, customRef } from 'vue'
import type { Ref } from 'vue'
// import type { ComputedRef } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ListDataProps } from './components/ColumnList.vue'
import CommonHeader, { UserProps } from './components/CommonHeader.vue'
import Chart from './chart.vue'
import Prosemirror from './prosemirror.vue'
import SelfInput from './SelfInput.vue'

const user: UserProps = {
  isLogin: true,
  name: 'hlongc',
  id: 1
}
const list: ListDataProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是的test3专栏，有一段非常有意思的简介，可以更新一下欧'
    // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是的test4专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    CommonHeader,
    SelfInput,
    Chart,
    Prosemirror
  },
  setup () {
    interface NumProps {
      name: string;
      label: string;
      id?: number;
    }
    interface InfoProps {
      nums: NumProps[];
    }
    const info: InfoProps = reactive({
      nums: [
        { name: 'soccer', label: '足球' },
        { name: 'basketball', label: '篮球' }
      ]
    })

    type ComputedProps<T> = Readonly<Ref<Readonly<T>>>

    const computedInfo: ComputedProps<NumProps[]> = computed<NumProps[]>(() => info.nums.map((item, index) => {
      return {
        ...item,
        id: index
      }
    }))
    // 自定义事件
    const selfEvent = new Event('hlongc')
    document.addEventListener('hlongc', e => {
      console.log(e)
    })

    const handleEvent = () => {
      document.dispatchEvent(selfEvent)
    }

    const inputVal = ref('xixi')
    // 自定义Ref
    function useDebounceRed<T> (value: T, delay = 2000): Ref<T> {
      let timer: number
      return customRef((track, trigger) => ({
        get () {
          track()
          return value
        },
        set (newVal: T) {
          console.log(newVal)
          clearTimeout(timer)
          timer = setTimeout(() => {
            value = newVal
            trigger()
          }, delay)
        }
      }))
    }

    return {
      list,
      user,
      inputVal,
      info,
      computedInfo,
      text: useDebounceRed<string>('hello'),
      handleEvent
    }
  }
})
</script>

<style lang="less">
html, body, #app, .iframe-container {
  height: 100%;
}
</style>
