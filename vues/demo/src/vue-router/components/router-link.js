export default {
  props: {
    tag: {
      type: String,
      default: 'a'
    },
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    push(e) {
      e.preventDefault()
      this.$router.push(this.to)
    }
  },
  render(h) {
    const tag = this.tag
    return h(tag, { on: { click: this.push }, attrs: { href: `#${this.to}` } }, this.$slots.default)
  }
}
