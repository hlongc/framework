import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'

export default function useClickOutside (elementRef: Ref<HTMLElement | null>) {
  const isClickOutside = ref<boolean>(false)
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      isClickOutside.value = elementRef.value.contains(e.target as HTMLElement)
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}
