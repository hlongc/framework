<template>
  <div>
    <Button></Button>
    <Icon></Icon>
    <ButtonGroup></ButtonGroup>
    <Suspense>
      <template #fallback>正在加载中</template>
      <template #default>
        <Carousel></Carousel>
      </template>
    </Suspense>
    <Message></Message>
    <Tree></Tree>
  </div>
</template>

<script>
import Button from "./example/button.vue";
import ButtonGroup from "./example/button-group.vue";
import Icon from "./example/icon.vue";
import Carousel from "./example/carousel.vue";
import Message from "./example/message.vue";
import Tree from "./example/tree.vue";
import { reactive, toRefs } from "vue";

export default {
  name: "App",
  components: {
    Button,
    Icon,
    ButtonGroup,
    Carousel,
    Message,
    Tree
  },
  setup() {
    const list = reactive({
      list: [{ name: "hlongc", age: 17 }, { name: "hulongchao", age: 24 }]
    });
    return {
      ...toRefs(list)
    };
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
