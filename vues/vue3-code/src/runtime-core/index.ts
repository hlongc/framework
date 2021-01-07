export interface OptionsType {
  createElement?: (type: any) => HTMLElement;
  insert?: (child: HTMLElement, parent: HTMLElement, anchor: null | HTMLElement) => void;
  remove?: (child: HTMLElement) => void;
  setElementText?: (child: HTMLElement, text: string) => void;
  createTextElement?: (content: string) => Text;
  patchProps?: (el: HTMLElement, key: any, prev: any, next: any) => void;
} 

import { createAppApi } from './apiCreateApp'

export function createRenderer(nodeOps: OptionsType) {
  console.log(nodeOps)
  const render = () => {
    console.log('渲染器')
  }
  return {
    createApp: createAppApi(render)
  }
}