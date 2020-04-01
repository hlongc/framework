import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import Button from '@/package/components/button/button.vue'
import Icon from '@/package/components/icon.vue'

// 单元测试进行分组
describe('hlc-button test:', () => {
  it('1.测试slot内容是否正确显示', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'hlc-ui'
      }
    })
    expect(wrapper.text()).to.eq('hlc-ui')
  })

  it('2.测试icon是否正确显示', () => {
    const wrapper = shallowMount(Button, {
      stubs: {
        'hlc-icon': Icon // 替换标签为组件
      },
      propsData: {
        prefixIcon: 'loading'
      }
    })
    expect(wrapper.find('use').attributes('href')).to.eq('#icon-loading')
  })

  it('3.测试按钮是否能点击', () => {
    const wrapper = shallowMount(Button)
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click').length).to.eq(1)
  })

  it('4.测试按钮中的icon位置是否正确', () => {
    const wrapper = shallowMount(Button, {
      attachToDocument: true, // 放到浏览器中进行渲染
      stubs: {
        'hlc-icon': Icon // 替换标签为组件
      },
      propsData: {
        prefixIcon: 'loading'
      },
      slots: {
        default: '我是文字'
      }
    })
    expect(document.querySelector('svg+span').tagName).to.eq('SPAN')
  })
})