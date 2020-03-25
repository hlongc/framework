import { throttle } from 'lodash'
export default function (Vue, options) {
  class Observer {
    constructor(src, el, handleChange) {
      this.src = src
      this.el = el
      this.loaded = false
      this.handleChange = handleChange
    }
    load() { // 加载图片
      this.handleChange(this, 'loading')
      this.asyncLoad(() => {
        this.handleChange(this, 'success')
      }, () => {
        this.handleChange(this, 'error')
      })
    }
    asyncLoad(resolve, reject) {
      const image = new Image
      image.src = this.src
      image.onload = resolve
      image.onerror = reject
    }
  }
  return class Lazy {
    constructor() {
      this.err = options.err
      this.loading = options.loading
      this.handleListener = false
      this.queue = []
      this.handleScroll = () => {
        this.queue.forEach(item => {
          const { top } = item.el.getBoundingClientRect()
          // 如果当前元素的top值小于当前浏览器视窗高度，那么就显示出来，显示视窗高度的1.3倍
          const catIn = top < window.innerHeight * (options.ratio || 1.3)
          if (catIn && !item.loaded) { // 图片加载过就不再次加载了
            item.loaded = true
            item.load()
          }
        })
      }
    }
    add(el, binding) {
      Vue.nextTick(() => {
        function findParent() {
          let parent = el.parentNode
          while(parent) {
            // 查找到包含滚动属性的父级元素
            if (/scroll|auto/.test(getComputedStyle(parent)['overflow'])) {
              return parent
            }
            parent = parent.parentNode
          }
        }
        const parent = findParent()
        if (!this.handleListener) { // 已经给父元素绑定过滚动事件就不用再次绑定了
          this.handleListener = true
          parent.addEventListener('scroll', throttle(this.handleScroll, 200))
        }
        const src = binding.value // 当前图片的真实路径
        this.queue.push(new Observer(src, el, this.handleChange.bind(this)))
        this.handleScroll()
      })
    }
    // 根据状态显示不同的图片
    handleChange(img, stat) {
      let src
      switch (stat) {
        case 'loading':
          src = this.loading
          break
        case 'err':
          src = ''
          break
        default:
          src = img.src
      }
      img.el.setAttribute('src', src)
    }
  }
}
