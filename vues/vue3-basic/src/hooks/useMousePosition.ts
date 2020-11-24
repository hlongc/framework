import { reactive, onMounted, onBeforeUnmount, toRefs } from 'vue';

export default () => {
  const axis = reactive({
    x: 0,
    y: 0
  });
  const updateAxis = (e: MouseEvent) => {
    axis.x = e.pageX;
    axis.y = e.pageY;
  };

  onMounted(() => {
    console.log('mounted');
    document.addEventListener('click', updateAxis);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', updateAxis);
  });

  return { ...toRefs(axis) };
};
