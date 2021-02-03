import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/HelloWorld'
import NotFound from '@/components/404'
import Example from '@/components/Example'
import Drag from '@/components/Drag.vue'
import Setting from '@/components/setting.vue'
import User from '@/components/UserMange.vue'
import Message from '@/components/MesMange.vue'
import VueContainer from '@/components/Vue.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/drag',
    component: Drag
  },
  {
    path: '/setting',
    component: Setting,
    meta: { title: '系统设置' },
    children: [{
      path: 'user',
      component: User,
      meta: { title: '用户管理' }
    }, {
      path: 'message',
      component: Message,
      meta: { title: '短信管理' }
    }]
	},
	{
		path: '/vue',
		redirect: '/vue/home'
	},
	{
		path: '/vue/home',
		name: 'third',
		component: VueContainer
	},
	{
		path: '/vue/about',
		name: 'third',
		component: VueContainer
	},
	{
		path: '/vue/user',
		name: 'third',
		component: VueContainer
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


const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  console.log('第一个beforeEach')
  next()
})

router.beforeEach((to, from, next) => {
  console.log('第二个beforeEach')
  next()
})

export default router
