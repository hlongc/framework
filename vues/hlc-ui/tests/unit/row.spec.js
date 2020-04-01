import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import Row from '@/package/components/layout/row.vue'
import Col from '@/package/components/layout/col.vue'

describe('hcl-row test:', () => {
  it('1.测试gutter属性', async () => {
    const wrapper = shallowMount(Row, {
      attachToDocument: true,
      stubs: { // 占位符配置 用Col组件去替代hlc-col
        'hlc-col': Col
      },
      propsData: {
        gutter: 20
      },
      slots: {
        default: '<hlc-col></hlc-col>'
      }
    })
    expect(getComputedStyle(wrapper.vm.$el)['marginLeft']).to.eq('-10px')
    expect(getComputedStyle(wrapper.vm.$el)['marginRight']).to.eq('-10px')

    await wrapper.vm.$nextTick() // 等待下一个tick完成，此时子组件才渲染完成
    // 测试hlc-col是否有左右padding 10px
    const col = wrapper.vm.$el.querySelector('.hlc-col')
    expect(getComputedStyle(col)['paddingLeft']).to.eq('10px')
    expect(getComputedStyle(col)['paddingRight']).to.eq('10px')
  })
  it('2.测试justify=start', () => {
    const wrapper = shallowMount(Row, {
      attachToDocument: true,
      stubs: { // 占位符配置 用Col组件去替代hlc-col
        'hlc-col': Col
      },
      propsData: {
        justify: 'start'
      },
      slots: {
        default: '<hlc-col></hlc-col>'
      }
    })
    expect(getComputedStyle(wrapper.vm.$el)['justifyContent']).to.eq('flex-start')
  })
  it('3.测试justify=end', () => {
    const wrapper = shallowMount(Row, {
      attachToDocument: true,
      stubs: { // 占位符配置 用Col组件去替代hlc-col
        'hlc-col': Col
      },
      propsData: {
        justify: 'end'
      },
      slots: {
        default: '<hlc-col></hlc-col>'
      }
    })
    expect(getComputedStyle(wrapper.vm.$el)['justifyContent']).to.eq('flex-end')
  })
  it('4.测试justify=center', () => {
    const wrapper = shallowMount(Row, {
      attachToDocument: true,
      stubs: { // 占位符配置 用Col组件去替代hlc-col
        'hlc-col': Col
      },
      propsData: {
        justify: 'center'
      },
      slots: {
        default: '<hlc-col></hlc-col>'
      }
    })
    expect(getComputedStyle(wrapper.vm.$el)['justifyContent']).to.eq('center')
  })
  it('5.测试justify=space-around', () => {
    const wrapper = shallowMount(Row, {
      attachToDocument: true,
      stubs: { // 占位符配置 用Col组件去替代hlc-col
        'hlc-col': Col
      },
      propsData: {
        justify: 'space-around'
      },
      slots: {
        default: '<hlc-col></hlc-col>'
      }
    })
    expect(getComputedStyle(wrapper.vm.$el)['justifyContent']).to.eq('space-around')
  })
  it('6.测试justify=space-between', () => {
    const wrapper = shallowMount(Row, {
      attachToDocument: true,
      stubs: { // 占位符配置 用Col组件去替代hlc-col
        'hlc-col': Col
      },
      propsData: {
        justify: 'space-between'
      },
      slots: {
        default: '<hlc-col></hlc-col>'
      }
    })
    expect(getComputedStyle(wrapper.vm.$el)['justifyContent']).to.eq('space-between')
  })
})