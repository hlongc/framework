<template>
  <div class="row">
    <div class="col-1">
      <button class="btn btn-secondary button" @click="sort">重置</button>
    </div>

    <div class="col-6">
      <h3>首页总览</h3>
      <div>
        <div class="half">
          <draggable
        class="list-group"
        tag="ul"
        v-model="left"
        v-bind="dragOptions"
        @start="isDragging = true"
        @end="isDragging = false"
      >
        <transition-group type="transition" name="flip-list">
          <li
            class="list-group-item"
            v-for="element in left"
            :key="element.order"
          >
            <template v-if="element.children && element.children.length > 0">
              <p>
                {{ element.name }}
                <input type="checkbox" v-model="element.checked" />
              </p>
              <draggable
                class="list-group"
                tag="ul"
                v-model="element.children"
                v-bind="dragOptions"
                @start="isDragging = true"
                @end="isDragging = false"
              >
                <transition-group type="transition" name="flip-list">
                  <li
                    class="list-group-item"
                    v-for="el in element.children"
                    :key="el.order"
                  >
                    {{ el.name }}
                    <input type="checkbox" v-model="el.checked" />
                  </li>
                </transition-group>
              </draggable>
            </template>
            <template v-else>
              {{ element.name }}
              <input type="checkbox" v-model="element.checked" />
            </template>
          </li>
        </transition-group>
      </draggable>
        </div>
        <div class="half">
          <draggable
                class="list-group"
                tag="ul"
                v-model="right"
                v-bind="dragOptions"
                @start="isDragging = true"
                @end="isDragging = false"
              >
                <transition-group type="transition" name="flip-list">
                  <li
                    class="list-group-item"
                    v-for="el in right"
                    :key="el.order"
                  >
                    {{ el.name }}
                    <input type="checkbox" v-model="el.checked" />
                  </li>
                </transition-group>
              </draggable>
        </div>
      </div>
    </div>

    <!-- <rawDisplayer class="col-3" :value="all" title="List" /> -->
  </div>
</template>

<script>
import draggable from "vuedraggable";
const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs"
];


const left = [
    { name: '热点舆情', order: 1, checked: true },
    { name: '市场规模', order: 2, checked: true },
    { name: '市场行情', order: 3, checked: true },
    { name: '市场分布', order: 4, checked: true, children: [
      { name: '行业分布', order: 1, checked: true },
      { name: '地区分布', order: 2, checked: true },
      { name: '市值分布', order: 3, checked: true },
      { name: '风险分类分布', order: 4, checked: true },
      { name: '所有制分布', order: 5, checked: true },
      { name: '财报披露分布', order: 6, checked: true }
    ] },
  ]
const right = [
    { name: '市场舆情走势', order: 1, checked: true },
    { name: '风险公司top10', order: 2, checked: true },
    { name: '风险标签top10', order: 3, checked: true }
  ]

export default {
  name: "transition-demo",
  display: "Transition",
  order: 6,
  components: {
    draggable
  },
  data() {
    return {
      left: JSON.parse(JSON.stringify(left)),
      right: JSON.parse(JSON.stringify(right))
    };
  },
  methods: {
    sort() {
      this.left = JSON.parse(JSON.stringify(left))
      this.right =  JSON.parse(JSON.stringify(right))
    }
  },
  computed: {
    all() {
      return { left: this.left, right: this.right }
    },
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  }
};
</script>

<style scoped>
input[type=checkbox] {
  float: right;
}
.half {
  display: inline-block;
  width: 50%;
  box-sizing: border-box;
  float: left;
}
.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
