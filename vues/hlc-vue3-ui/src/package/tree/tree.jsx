import TreeNode from './tree-node';
import { getCurrentInstance, provide, watch, reactive } from 'vue';
import { flattenTree } from './util';

export default {
  name: 'hu-tree',
  components: {
    [TreeNode.name]: TreeNode
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    // 懒加载的方法
    load: {
      type: Function
    },
    // 是否允许拖拽
    draggable: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const renderTree = () => {
      if (!props.data.length) {
        return '暂无数据';
      }
      return props.data.map(item => <hu-tree-node data={item}></hu-tree-node>);
    };

    let flatMap = flattenTree(props.data);
    // 动态加载的数据发生变化时，重新计算一次map，否则后面选中会报错
    watch(props.data, () => {
      flatMap = flattenTree(props.data);
    });

    const state = reactive({
      dragPosition: '', // 0:儿子 1:哥哥 -1:弟弟
      dragNode: null, // 正在拖拽的节点
      dragData: null, // 正在拖拽的数据,
      showLine: false // 是否显示那个线
    });
    const instance = getCurrentInstance(); // 获取当前实例, ctx代表上下文，添加方法像外部暴露
    console.log(instance);
    const methods = {
      getCheckNodes() {
        return Object.values(flatMap).filter(item => item.node.checked);
      },
      // 更新子节点的选中效果
      updateTreeDown(node, checked) {
        if (node.children) {
          node.children.forEach(child => {
            child.checked = checked;
            if (child.children) {
              methods.updateTreeDown(child, checked);
            }
          });
        }
      },
      // 更新父节点的选中效果
      updateTreeUp(node, checked) {
        const parent = flatMap[node.key].parent;
        if (!parent) return;
        if (checked) {
          parent.checked = parent.children.every(child => child.checked);
          methods.updateTreeUp(parent, checked);
        } else {
          parent.checked = checked;
          methods.updateTreeUp(parent, checked);
        }
      },
      dragStart(e, childInstance, childData) {
        state.dragNode = childInstance;
        state.dragData = childData;
      },
      dragOver(e, childInstance, childData) {
        // 在自身进行移动就忽略
        if (state.dragData.key === childData.key) {
          return;
        }
        // 不允许拖拽到子节点里面
        const overElement = childInstance.ctx.$el;
        if (state.dragNode.ctx.$el.contains(overElement)) {
          return;
        }
        const treePosition = instance.ctx.$el.getBoundingClientRect();
        // 获取到第一个子节点的位置
        const firstChildPosition = overElement.firstElementChild.getBoundingClientRect();

        const distance = e.clientY - firstChildPosition.top;
        if (distance < firstChildPosition.height * 0.2) {
          // 在前20%，说明是哥哥
          state.dragPosition = 1;
        } else if (distance > firstChildPosition.height * 0.8) {
          // 在后20%，说明是弟弟
          state.dragPosition = -1;
        } else {
          // 中间60%是儿子
          state.dragPosition = 0;
        }
        // 计算线的位置
        let lineTop = -999999;
        const iconPosition = overElement
          .querySelector('.hu-icon')
          .getBoundingClientRect();
        // 如果是弟弟就把线放到底部
        if (state.dragPosition === -1) {
          lineTop = iconPosition.bottom - treePosition.top;
        } else if (state.dragPosition === 1) {
          // 哥哥就放顶部
          lineTop = iconPosition.top - treePosition.top;
        }
        const line = instance.ctx.$refs.line; // 获取到那条线
        line.style.top = lineTop + 'px';
        line.style.left = iconPosition.right - treePosition.left + 'px';
        state.showLine = [-1, 1].includes(state.dragPosition); // 只有弟弟和哥哥的关系才展示
      },
      dragEnd(e, childInstance, childData) {
        state.dragPosition = ''; // 0:儿子 1:哥哥 -1:弟弟
        state.dragNode = null; // 正在拖拽的节点
        state.dragData = null; // 正在拖拽的数据,
        state.showLine = false; // 是否显示那个线
      }
    };

    provide('update', {
      parentMethods: methods,
      slot: context.slots.default, // 支持插槽
      load: props.load,
      draggable: props.draggable // 是否可以拖拽
    });

    instance.ctx.getCheckNodes = methods.getCheckNodes;

    return () => (
      <div class="hu-tree">
        {renderTree()}
        <div class="hu-tree-line" ref="line" vShow={state.showLine}></div>
      </div>
    );
  }
};
