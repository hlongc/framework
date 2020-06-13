const compiler = require('vue-template-compiler')

let el = `<div>
<div v-for="item in arr" :key="item.id">{{item.name}}</div>
</div>`

el = `<div id='container' class='wrapper' :class='classes' @detail="detail" @click="handleClick">
  嘻嘻
  <input v-model="val" />
  <template v-if="show === 1">
    111
  </template>
  <template v-else-if="show === 2">
    222
  </template>
  <template v-else>
    333
  </template>
</div>`

console.log(compiler.compile(el).render)

