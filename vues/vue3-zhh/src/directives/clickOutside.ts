import type { ObjectDirective, DirectiveBinding } from 'vue'

interface SelfElement extends HTMLElement {
  handleClick?: (e: MouseEvent) => void;
}

const clickOutside: ObjectDirective = {
  mounted (el: SelfElement, binding: DirectiveBinding) {
    el.handleClick = (e: MouseEvent) => {
      if (el.contains(e.target as HTMLElement)) {
        binding.value()
      }
    }
    document.addEventListener('click', el.handleClick)
  },
  beforeUnmount (el: SelfElement) {
    document.removeEventListener('click', el.handleClick)
  }
}

export default clickOutside
