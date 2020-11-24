<template>
  <div>
    count: {{ count }}
    <button @click="addCount">+</button>
    <div v-if="loading">loading...</div>
    <p></p>
    <img v-if="success" style="height: 100px;" :src="src" alt>
    <p>工资: {{ salary }}</p>
    <p>税收: {{ tax }}</p>
    <p>
      <button @click="increaseSalary">涨工资</button>
    </p>
    <span v-for="item in hobby" :key="item">{{ item }}</span>
    <span>{{ person.name }}</span>
    <h2>x: {{ x }}, y: {{ y }}</h2>

    <!-- Suspense用法 -->
    <Suspense>
      <template #default>
        <div>
          <AsyncComponent/>
          <AsyncDog/>
        </div>
      </template>
      <template #fallback>
        <div>loading suspense</div>
      </template>
    </Suspense>

    <button @click="openModal">打开modal</button>
    <Modal :visible="visible" @close-modal="closeModal">
      <template #title>hello world</template>
    </Modal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  toRefs,
  onUpdated,
  watch
} from "vue";
import { useMousePosition, useFetchImage } from "./hooks";
import Modal from "./components/Modal.vue";
import AsyncComponent from "./components/AsyncComponent.vue";
import AsyncDog from "./components/AsyncDog.vue";

interface InfoProps {
  salary: number;
  tax: any;
  increaseSalary: () => void;
  hobby: string[];
  person: { name?: string };
}

export default defineComponent({
  name: "App",
  components: {
    Modal,
    AsyncComponent,
    AsyncDog
  },
  setup() {
    const count = ref(0);
    const addCount = () => {
      count.value++;
    };

    const { x, y } = useMousePosition();
    const { loading, success, src } = useFetchImage(
      "https://dog.ceo/api/breeds/image/random"
    );

    onUpdated(() => {
      console.log("updated");
    });

    const info: InfoProps = reactive({
      salary: 0,
      tax: computed(() => info.salary * 0.12),
      increaseSalary() {
        info.salary += 200;
      },
      hobby: ["🏀", "⚽️", "🎱", "🏸"],
      person: {}
    });

    watch(
      () => info.salary,
      (news, old) => {
        console.log("之前的薪资", old);
        console.log("现在的薪资", news);
      }
    );

    info.hobby[1] = "🏐";
    info.person.name = "hlc";

    const visible = ref(false);
    const openModal = () => {
      visible.value = true;
    };
    const closeModal = () => {
      visible.value = false;
    };

    return {
      count,
      addCount,
      ...toRefs(info),
      x,
      y,
      loading,
      success,
      src,
      visible,
      openModal,
      closeModal
    };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
