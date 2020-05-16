const compiler = require('vue-template-compiler')

const el = `<div>
<div v-for="item in arr" :key="item.id">{{item.name}}</div>
</div>`

console.log(compiler.compile(el).render)
