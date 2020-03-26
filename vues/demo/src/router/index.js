import Vue from 'vue'
import Router from '@/vue-router'
import Home from '@/components/HelloWorld'
import NotFound from '@/components/404'
import Example from '@/components/Example'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/drag',
    name: 'drag',
    component: () => import('@/components/Drag.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/components/setting.vue'),
    redirect: '/setting/user',
    meta: { title: '系统设置' },
    children: [{
      path: 'user',
      component: () => import('@/components/UserMange.vue'),
      name: 'usermanage',
      meta: { title: '用户管理' }
    }, {
      path: 'message',
      component: () => import('@/components/MesMange.vue'),
      name: 'mesmanage',
      meta: { title: '短信管理' }
    }]
  },
  {
    path: '*',
    component: NotFound
  }
]

routes.push({
  path: '/example',
  name: 'example',
  component: Example,
  meta: { title: '综合实例' }
})

export default new Router({
  routes
})
