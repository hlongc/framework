import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import Foo from './components/Foo.vue'
import Bar from './components/Bar.vue'

Vue.use(VueMeta) // meta插件,可以让每个路由组件拥有自己的title
Vue.use(VueRouter)

export default () => {
  const router = new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/foo',
        name: 'foo',
        component: Foo
      },
      {
        path: '/',
        name: 'bar',
        component: Bar
      }
    ]
  })
  return router
}