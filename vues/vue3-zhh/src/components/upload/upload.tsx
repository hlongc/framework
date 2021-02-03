import { defineComponent, onMounted, ref, watch } from 'vue'
import useClickOutside from '@/hooks/useClickOutside'

export default defineComponent({
  name: 'hu-upload',
  props: {
    multiple: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { slots }) {
    console.log('hello')
    console.log(props)
    console.log(slots)
    const inputRef = ref<null | HTMLInputElement>(null)
    const handleClick = () => {
      if (inputRef.value) {
        inputRef.value.click()
      }
    }
    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      if (target.files) {
        console.log(target.files[0])
      }
    }

    // const test = ref<HTMLElement | null>(null)
    // const isOutside = useClickOutside(test)
    // watch(isOutside, () => {
    //   console.log(`点击在测试元素${test.value ? '外面' : '里面'}`)
    // })

    return () => (
      <div class="hu-upload">
        <p v-show={false}>v-show</p>
        {/* <div style={{ backgroundColor: 'deepskyblue' }}>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
        </div> */}
        <div class="upload-btn" onClick={handleClick}>
          { slots.default ? slots.default() : <button>点击上传123</button> }
          { slots.sub && slots.sub() }
        </div>
        <input type="file" ref={inputRef} style="display: none;" onChange={handleChange} />
      </div>
    )
  }
})
