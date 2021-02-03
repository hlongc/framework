import clickOutside from './clickOutside'
import type { ObjectDirective } from 'vue'

interface DirectiveMap {
  [propName: string]: ObjectDirective;
}

export default {
  clickOutside
} as DirectiveMap
