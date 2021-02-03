import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Hello from '../routes/hello.vue'
import World from '../routes/world.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/hello',
    component: Hello
  },
  {
    path: '/world/:count',
    component: World,
    props: { name: 'hlc', age: 25 },
    meta: {
      auth: false
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((from, to, next) => {
  console.log(from)
  console.log(to)
  next()
})

export default router
