import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonType, ButtonSize, ButtonProps } from './button'

const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  type: ButtonType.Danger,
  size: ButtonSize.Large,
  className: 'klass'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe('Button Component test', () => {
  it('component default render', () => {
    const wrapper = render(<Button {...defaultProps}>hello world</Button>)
    const el = wrapper.getByText('hello world') // 根据文本查找元素
    expect(el).toBeInTheDocument()
    expect(el.tagName).toBe('BUTTON')
    expect(el).toHaveClass('btn btn-default')
    fireEvent.click(el)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  
  it('render different type Button Component', () => {
    const wrapper = render(<Button {...testProps}>hello world</Button>)
    const el = wrapper.getByText('hello world') // 根据文本查找元素
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('btn btn-danger btn-large klass') // 测试包含对应的类名
  })

  it('render link Button Component and provide href attribute', () => {
    const wrapper = render(<Button type={ButtonType.Link} href='https://foo'>Link</Button>)
    const el = wrapper.getByText('Link') // 根据文本查找元素
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('btn btn-normal btn-link') // 测试包含对应的类名
    expect(el.tagName).toBe('A')
  })

  it('render disabled Button Component', () => {
    const wrapper = render(<Button {...disabledProps}>Disabled</Button>)
    const el = wrapper.getByText('Disabled') as HTMLButtonElement // 根据文本查找元素
    expect(el).toBeInTheDocument()
    expect(el.disabled).toBeTruthy()
    fireEvent.click(el)
    expect(disabledProps.onClick).not.toHaveBeenCalled() // 测试点击事件是否生效
  })
})