<template>
  <input :value="name" @input="$emit('changeName', $event.target.value)" />
</template>
<script>
export default {
  name: 'demo',
  model: {
    prop: 'name',
    event: 'changeName'
  },
  props: {
    name: {
      type: String
    }
  }
}
</script>

