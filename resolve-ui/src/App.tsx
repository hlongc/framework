import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/button/button'
import Alert, { AlertType } from './components/alert/alert'
import { Menu, MenuItem, SubMenu } from './components/menu'

function App() {
  return (
    <div className="App">
      <Menu defaultIndex='0' onSelect={index => {
        console.log(index)
      }}>
        <MenuItem index='0'>
          react
        </MenuItem>
        <MenuItem index='1' disabled>
          angular
        </MenuItem>
        <SubMenu index='2' title='vue'>
          <MenuItem index='2-1'>
            vuex
          </MenuItem>
          <MenuItem index='2-2'>
            vue-router
          </MenuItem>
        </SubMenu>
        <MenuItem index='2'>
          backbone
        </MenuItem>
        <MenuItem index='3'>
          underscore
        </MenuItem>
      </Menu>
      {/* <Alert title='测试一下啊' type={AlertType.Success} closeable /> */}
      {/* <Button
        type={ButtonType.Link}
        href='https://www.baidu.com'
        target='_blank'
        onClick={e => {
          e.preventDefault()
          console.log(111)
        }}
      >
        baidu.com
      </Button>
      <Button type={ButtonType.Link} disabled href='https://www.baidu.com'>baidu.com</Button>
      <Button type={ButtonType.Primary} disabled>Primary Default</Button>
      <Button type={ButtonType.Default} size={ButtonSize.Large}>Large Button</Button>
      <Button type={ButtonType.Default}>Normal Button</Button>
      <Button type={ButtonType.Danger} size={ButtonSize.Small}>Small Button</Button> */}
    </div>
  );
}

export default App;
