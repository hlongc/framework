import React from 'react'
import classnames from 'classnames'

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

export enum ButtonSize {
  Mini = 'mini',
  Small = 'small',
  Normal = 'normal',
  Large = 'large'
}

interface IButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  className?: string;
  href?: string;
  disabled?: boolean;
  children?: React.ReactNode
}

// 获取button和a上面的原生属性，进行支持比如onClick，autofocus...
type ButtonAttributes = IButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorAttributes = IButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = ButtonAttributes | AnchorAttributes

const Button: React.FC<ButtonProps> = props => {
  const { type, size, className, href, children, disabled, ...rest } = props
  const classes = classnames('btn', {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    'disabled': (type === 'link') && disabled
  }, className)
  if (type === ButtonType.Link && href) {
    return <a href={href} className={classes} {...rest}>{ children }</a>
  }
  return <button className={classes} disabled={disabled} {...rest}>{ children }</button>
}

Button.defaultProps = {
  type: ButtonType.Default,
  size: ButtonSize.Normal
}

export default Button