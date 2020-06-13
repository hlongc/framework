import React, { createContext, useState } from 'react'
import classnames from 'classnames'
import { MenuItemProps } from './menuItem'

type Mode = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex: string) => void

export interface MenuProps {
  defaultIndex?: string;
  mode?: Mode;
  onSelect?: SelectCallback;
  className?: string;
}

export interface IMenuContext {
  index: string;
  onSelect: SelectCallback;
}

export const MenuContext = createContext({
  index: '0',
  onSelect: (index: string) => {}
})

const Menu: React.FC<MenuProps> = props => {
  const { defaultIndex, mode, onSelect, className, children } = props
  const [ activeIndex, setActive ] = useState(defaultIndex ? defaultIndex : '0')
  const classes = classnames('resolve-menu', mode, className)

  const handleClick = (selectIndex: string) => {
    setActive(selectIndex)
    onSelect && onSelect(selectIndex)
  }

  const context: IMenuContext = {
    index: activeIndex,
    onSelect: handleClick
  }

  // 检测子元素是否是MenuItem 或者SubMenu
  function renderChild() {
    return React.Children.map(children, (child, index) => {
      const childInstance = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childInstance.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return child
      } else {
        console.error('Menu Component has a child which is not MenuItem')
        return null
      }
    })
  }

  return (
    <ul className={classes}>
      <MenuContext.Provider value={context}>
        { renderChild() }
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal'
}

export default Menu