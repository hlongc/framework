import React from 'react'
import ReactDom from 'react-dom'
import classnames from 'classnames'

// alert类型
export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'warning'
}

interface AlertProps {
  title: string;
  description?: string,
  type?: AlertType,
  onClose?: () => void;
  closeable?: boolean // 是否显示关闭按钮
}

const Alert: React.FC<AlertProps> = props => {
  const { title, description, type, onClose, closeable } = props
  const classes = classnames('alert', {
    [`alert-${type}`]: type
  })
  const child = (
    <div className={classes}>{title}</div>
  )
  console.log(child)
  ReactDom.createPortal(child, document.body)
  return null
}

Alert.defaultProps = {
  closeable: true,
  onClose: () => {},
  description: '',
  type: AlertType.Default
}

export default Alert

