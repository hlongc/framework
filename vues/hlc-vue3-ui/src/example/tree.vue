<template>
  <hu-tree :data="treeData" ref="tree" :load="load" :draggable="true">
    <template v-slot="{ name, id }">{{ name }}🙄-({{ id }})😬</template>
  </hu-tree>
  <br>
  <hu-button @click="getCheckNodes">获取选中的节点</hu-button>
  <checkbox v-model="checked"/>
</template>

<script>
import { reactive, toRefs, ref, onMounted, getCurrentInstance } from "vue";
export default {
  setup() {
    const instance = getCurrentInstance();
    const state = reactive({
      treeData: [
        {
          id: "1",
          name: "菜单1",
          children: []
        },
        {
          id: "2",
          name: "菜单2",
          children: [
            {
              id: "2-1",
              name: "菜单2-1",
              children: [{ id: "2-1-1", name: "菜单2-1-1" }]
            },
            {
              id: "2-2",
              name: "菜单2-2",
              children: [{ id: "2-2-1", name: "菜单2-2-1" }]
            }
          ]
        }
      ],
      checked: false
    });
    const tree = ref(null);
    onMounted(() => {
      console.log(instance);
    });
    const getCheckNodes = () => {
      console.log(tree.value.getCheckNodes());
    };
    const load = (parent, cb) => {
      if (parent.id === "1") {
        setTimeout(() => {
          cb([{ id: "1-1", name: "菜单1-1", children: [] }]);
        }, 500);
      } else if (parent.id === "1-1") {
        setTimeout(() => {
          cb([{ id: "1-1-1", name: "菜单1-1-1" }]);
        }, 500);
      }
    };
    return {
      ...toRefs(state),
      getCheckNodes,
      tree,
      load
    };
  }
};
</script>
<style>
</style>