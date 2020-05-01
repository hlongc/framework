export default {
  props: {
    tag: {
      type: String,
      default: 'a'
    },
    to: {
      type: String | Object,
      required: true
    }
  },
  methods: {
    go(e) {
      e.preventDefault()
      if (typeof this.to === 'string') {
        this.$router.push(this.to)
      }
    }
  },
  render(h) {
    const tag = 'a' || this.tag
    return <a href="" onClick={$event => this.go($event)}>{this.$slots.default}</a>
  }
}
