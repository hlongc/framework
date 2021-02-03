import { computed, withModifiers, inject, ref, getCurrentInstance } from 'vue';
export default {
  name: 'hu-tree-node',
  props: {
    data: {
      type: Object
    }
  },
  setup(props) {
    const data = props.data;
    const { parentMethods, slot, load, draggable } = inject('update');
    const loaded = ref(false);

    const showArrow = computed(() => {
      return (data.children && data.children.length) || (load && !loaded.value);
    });

    const classes = computed(() => [
      'hu-tree-node',
      !showArrow.value && 'hu-tree-no-expand',
      draggable && 'hu-tree-draggable' // 拖拽不允许选择文字
    ]);

    const methods = {
      toggleExpand() {
        if (data.children && data.children.length === 0) {
          if (load && !loaded.value) {
            data.loading = true;
            load(data, children => {
              data.children = children;
              data.loading = false;
              loaded.value = true;
            });
          }
        } else {
          loaded.value = true;
        }
        data.expand = !data.expand;
      },
      handleCheck() {
        data.checked = !data.checked;
        // 更新父级和子级的状态
        parentMethods.updateTreeDown(data, data.checked);
        parentMethods.updateTreeUp(data, data.checked);
      }
    };
    const instance = getCurrentInstance();
    const events = {
      ...(draggable
        ? {
            onDragstart(e) {
              e.stopPropagation();
              parentMethods.dragStart(e, instance, data);
            },
            onDragover(e) {
              e.stopPropagation();
              parentMethods.dragOver(e, instance, data);
            },
            onDragend(e) {
              e.stopPropagation();
              parentMethods.dragEnd(e, instance, data);
            }
          }
        : {})
    };

    return () => (
      <div class={classes.value} {...events}>
        <div class="hu-tree-node-label" onClick={methods.toggleExpand}>
          <hu-icon type={data.loading ? 'loading' : 'add'}></hu-icon>
          <input
            type="checkbox"
            checked={data.checked}
            // 相当于vue2中的@click.stop修饰符
            onClick={withModifiers(methods.handleCheck, ['stop'])}
          />
          {slot ? slot(data) : <span>{data.name}</span>}
        </div>
        {data.children && data.children.length ? (
          <div class="hu-tree-children" vShow={data.expand}>
            {data.children.map(item => (
              <hu-tree-node data={item}></hu-tree-node>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
};
