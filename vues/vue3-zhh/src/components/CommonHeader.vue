<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">者也专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">登陆</a></li>
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">注册</a></li>
    </ul>
    <Dropdown
      v-else
      trigger="click"
    >
      <span>{{ user.name }}</span>
      <template #dropdown>
        <Dropdown-menu>
          <Dropdown-Item>个人中心</Dropdown-Item>
          <Dropdown-Item>你好啊</Dropdown-Item>
        </Dropdown-menu>
      </template>
    </Dropdown>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import DropdownMenu from './DropdownMenu.vue'

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export default defineComponent({
  name: 'CommonHeader',
  components: {
    Dropdown,
    DropdownItem,
    DropdownMenu
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup () {
    const visible = ref<boolean>(false)
    const toggle = () => {
      console.log('toggle')
      visible.value = !visible.value
    }
    return {
      visible,
      toggle
    }
  }
})
</script>
